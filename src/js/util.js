/*
 * util.js
 *
 * Copyright 2016 Milan Fort (http://www.milanfort.com/). All rights reserved.
 */

/**
 * This module provides various utility methods.
 *
 * @module util
 * @type {{contains, uriEncodeCoords}}
 *
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
        a = a || '';
        b = b || '';
        return a.trim().toLocaleLowerCase().indexOf(b.trim().toLowerCase()) !== -1;
    },

    /**
     * Returns a string encoding of provided geo location coordinates
     * suitable to be part of a uri string.
     *
     * @example
     * Input:
     * coords: {
     *   lat: 52.5163,
     *   lng: 13.3777
     * }
     * Output: 52.5163%7C13.3777
     *
     * @param coords {Object} input object with geo location coordinates.
     * @returns {string} uri encoded coordinates string.
     */
    uriEncodeCoords: function (coords) {
        return encodeURIComponent(coords.lat + '|' + coords.lng);
    }
};
