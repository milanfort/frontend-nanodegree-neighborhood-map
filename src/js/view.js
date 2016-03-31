'use strict';

var $ = require('jquery');
var util = require('./util');

var numbers = [5, 4, 3, 2, 1];

var view = module.exports = {

    init: function () {
        view.show();
    },

    show: function () {
        console.log("First number: " + util.first(numbers));
    }
};
