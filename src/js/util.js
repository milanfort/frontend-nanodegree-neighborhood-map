/**
 * This module provides various utility methods.
 *
 * @module util
 * @author Milan Fort (http://www.milanfort.com/)
 * @version 1.0
 * @since 1.0.0
 */

'use strict';

var _ = require('lodash');

module.exports = {

    /**
     * Returns the first number from the provided array of numbers.
     *
     * @param x {number[]} array of numbers
     * @returns {number} the first number from the provided array of numbers.
     */
    first: function (x) {
        return _.first(x);
    },

    /**
     * Converts the first letter of the provided string to uppercase.
     *
     * @param x {string} a string to capitalize.
     * @returns {string} a string with the first letter in uppercase.
     */
    capitalize: function (x) {
        return _.capitalize(x);
    }
};
