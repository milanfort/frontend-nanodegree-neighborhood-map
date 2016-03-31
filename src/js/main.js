'use strict';

var util = require('./util');
var view = require('./view');

var main = {
    init: function () {
        console.log("Starting Map...");
        console.log("Capitalized: " + util.capitalize("foo"));
        view.init();
    }
};

main.init();
