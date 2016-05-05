/*
 * config.js
 *
 * Copyright 2016 Milan Fort (http://www.milanfort.com/). All rights reserved.
 */

/**
 * This module provides global configuration values used
 * by the entire application. These values are only read
 * during runtime, never modified.
 *
 * @module config
 * @type {Object}
 * @readonly
 *
 * @author Milan Fort (http://www.milanfort.com/)
 * @version 1.0
 * @since 1.0.0
 */

module.exports = Object.freeze({

    /** Defines whether logging should be enabled. */
    DEBUG: true,

    /**
     * Logging level to use. Only relevant when
     * {@link module:config~DEBUG} is true.
     */
    LEVEL: 'INFO'
});
