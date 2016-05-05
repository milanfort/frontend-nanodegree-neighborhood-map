/**
 * This module implements the view functionality.
 *
 * @module view
 * @author Milan Fort (http://www.milanfort.com/)
 * @version 1.0
 * @see module:util
 * @since 1.0.0
 */

'use strict';

var $ = require('jquery');
require('bootstrap');

var logger = require('./logging').getLogger();
var util = require('./util');

var numbers = [5, 4, 3, 2, 1];

var view = module.exports = {

    /** Initializes the view. */
    init: function () {
        view.show();
    },

    /** Shows the view. */
    show: function () {
        logger.trace("First number: " + util.first(numbers));
    }
};
