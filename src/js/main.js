'use strict';

var config = require('./config');
var logging = require('./logging');
var util = require('./util');
var model = require('./model');
var view = require('./view');
var map = require('./map');

var start = function () {
    logging.init();

    if (config.DEBUG) {
        logging.enable();
        logging.setLevel(config.LEVEL);
    }

    var logger = logging.getLogger();
    logger.info("Starting application");

    view.init();

    map.init(model, function (title) {
        console.log("Clicked " + title);
    });

    map.showAllMarkers();
    //map.hideAllMarkers();
    //map.showMarker('TV Tower');
    //map.bounceMarker('TV Tower');
    //map.displayInfoWindow('TV Tower', 'Hello there!');
};

start();
