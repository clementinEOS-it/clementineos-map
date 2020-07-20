require('dotenv').config();
const _ = require('lodash');

let get_geoJSON = (data) => {

    var _g = {
        type: "FeatureCollection",
        features: []
    };
    
    _.forEach(data, d => {
        console.log(d);

        var _f = {
            type: "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [parseFloat(d.lng), parseFloat(d.lat)]
            },
            "properties": d
        }

        _g.features.push(_f);
    
    });
                          
    return _g;
};

let get_map = (state) => {

    var geojson_file;
    var title = '';

    const fs = require('fs')
    
    if (state == "italy") {
        geojson_file = './geojson/italy.geojson';
        title = 'NOME_REG';
    };

    if (state == "italy_prov") {
        geojson_file = './geojson/italy_prov.geojson';
    };

    if (state == "italy_city") {
        geojson_file = './geojson/italy_city.geojson';
    };

    let geojson = JSON.parse(fs.readFileSync(geojson_file));

    var response = {
        "type": "FeatureCollection", 
        "features": []
    };

    var features = _.map(geojson.features, feature => {
        
        var p = {
            api: null,
            title: '',
            data: null
        };

        p.data = feature.properties;
        p.title = feature.properties[title];

        return {
            type: feature.type,
            properties: p,
            geometry: feature.geometry
        }
    });

    response.features = features;

    /*

    { 
        "type": "Feature", 
        "properties": { "NOME_REG": "Piemonte" }, 
        "geometry": { "type": "MultiPolygon", 
        "coordinates": []
    }

    */
    
    return response;

};

let filterByCity = (map, filters) => {
    return _.filter(map.features, item => {
        return _.includes(filters, item.properties.nome_com);
    });
};

module.exports = {
    get_geoJSON,
    get_map,
    filterByCity
};