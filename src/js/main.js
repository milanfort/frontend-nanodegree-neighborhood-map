/*
 * main.js
 *
 * Copyright 2016 Milan Fort (http://www.milanfort.com/). All rights reserved.
 */

/**
 * This module is the entry point into the entire application.
 *
 * @module main
 * @author Milan Fort (http://www.milanfort.com/)
 * @version 1.0
 * @since 1.0.0
 */

'use strict';

var $ = window.jQuery = require('jquery'),
    ko = require('knockout'),
    config = require('./config'),
    logging = require('./logging'),
    viewModel = require('./viewModel');

(function () {
    var logger;

    logging.init();

    if (config.DEBUG) {
        logging.enable();
        logging.setLevel(config.LEVEL);
    }

    logger = logging.getLogger();
    logger.info("Starting application; using jQuery v%s", $().jquery);

    ko.applyBindings(viewModel);
    viewModel.init();
}());
