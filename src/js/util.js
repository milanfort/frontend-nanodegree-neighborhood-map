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
    },

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
