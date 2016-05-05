/*
 * logging.js
 *
 * Copyright 2016 Milan Fort (http://www.milanfort.com/). All rights reserved.
 */

/**
 * This module allows the application components to log into browser console.
 *
 * @module logging
 * @type {{init, enable, setLevel, getLogger}}
 *
 * @author Milan Fort (http://www.milanfort.com/)
 * @version 1.0
 * @since 1.0.0
 */

'use strict';

var log4js = require('log4js'),
    LOGGING_OFF,
    LOGGING_ON,
    init,
    enable,
    setLevel,
    getLogger;

/** Log4js configuration object that disables logging. */
LOGGING_OFF = Object.freeze({
    appenders: [],
    levels: {
        '[all]': 'OFF'
    }
});

/** Log4js configuration object that enables logging. */
LOGGING_ON = Object.freeze({
    appenders: [
        {
            type: 'console',
            layout: {
                type: 'pattern',
                pattern: "%p: %m%n"
            }
        }
    ],
    levels: {
        '[all]': 'ALL'
    },
    replaceConsole: false
});

/**
 * Initializes this logging module.
 *
 * _This method must be called before the first call to
 * {@link module:logging~getLogger} method._
 */
init = function () {
    log4js.configure(LOGGING_OFF);
};

/**
 * Enables logging globally for the entire application.
 *
 * After initialization, logging is disabled by default. This method must be called
 * to explicitly enable it. Should be only used during development/debugging and not
 * called if the code is supposed to be deployed in production.
 */
enable = function () {
    log4js.configure(LOGGING_ON);
};

/**
 * Sets the logging level for the entire application.
 *
 * @param {string} [level=ALL] - The logging level that should
 * be set for the entire application.
 */
setLevel = function (level) {
    var logger = log4js.getLogger();
    logger.setLevel(level || 'ALL');
};

/**
 * Returns the main logger used in the entire application.
 *
 * @return {log4js.Logger} The main logger used in the entire application.
 */
getLogger = function () {
    return log4js.getLogger();
};

module.exports = {

    init: init,

    enable: enable,

    setLevel: setLevel,

    getLogger: getLogger
};
