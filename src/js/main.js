'use strict';

var util = require('./util');
var model = require('./model');
var view = require('./view');
var map = require('./map');

var main = {
    init: function () {
        console.log("Starting Map...");
        console.log("Capitalized: " + util.capitalize("foo"));
        view.init();

        map.init(model, function (title) {
            console.log("Clicked " + title);
        });

        map.showAllMarkers();
        //map.hideAllMarkers();
        //map.showMarker('TV Tower');
        //map.bounceMarker('TV Tower');
        //map.displayInfoWindow('TV Tower', 'Hello there!');
    }
};

main.init();
