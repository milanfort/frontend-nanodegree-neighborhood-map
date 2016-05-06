/*
 * util.js
 *
 * Copyright 2016 Milan Fort (http://www.milanfort.com/). All rights reserved.
 */

/**
 * This module provides various utility methods.
 *
 * @module util
 * @author Milan Fort (http://www.milanfort.com/)
 * @version 1.0
 * @since 1.0.0
 */

'use strict';

module.exports = {

    /**
     * Returns true iff the first string contains the second string.
     * White space and character case is ignored.
     *
     * @param a {string} a string to test if it contains the other string.
     * @param b {string} a string to test if it is part of the first string.
     * @returns {boolean} true iff the first string contains the second string.
     */
    contains: function (a, b) {
        return a.trim().toLocaleLowerCase().indexOf(b.trim().toLowerCase()) !== -1;
    }
};
