'use strict';

window.$ = window.jQuery = require('jquery');
var ko = require('knockout');
var config = require('./config');
var logging = require('./logging');
var model = require('./model');
var view = require('./view');
var viewModel = require('./viewModel');

var start = function () {
    logging.init();

    if (config.DEBUG) {
        logging.enable();
        logging.setLevel(config.LEVEL);
    }

    var logger = logging.getLogger();
    logger.info("Starting application");

    view.init();

    ko.applyBindings(viewModel);
    viewModel.init();

    //viewModel.select(model[4]);
    //map.showAllMarkers();
    //map.hideAllMarkers();
    //map.showMarker('TV Tower');
    //map.bounceMarker('TV Tower');
    //map.displayInfoWindow('TV Tower', 'Hello there!');
};

start();
