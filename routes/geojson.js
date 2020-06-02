var express = require('express');
var geoJSONController = require('../controllers/geojson');

var router = express.Router();

router.get('/:state', (req, res, next) => {
    var map = geoJSONController.get_map(req.params.state);
    res.jsonp(map);
});

module.exports = router;
