var express = require('express');
var _ = require('lodash');
var geoJSONController = require('../controllers/geojson');

var router = express.Router();
var map;

router.param('state', function (req, res, next, state) {
    map = geoJSONController.get_map(state);
    next();
})

router.get('/:state', (req, res, next) => {
    res.jsonp(map);
});

router.post('/IT/city', (req, res, next) => {

    map = geoJSONController.get_map('italy_city');
    console.log('Body: ' + JSON.stringify(req.body.filters));
        
    if (_.size(req.body.filters) >= 0) {
        map = geoJSONController.filterByCity(map, req.body.filters);
        // console.log(map);
    };

    res.jsonp(map);
});

module.exports = router;
