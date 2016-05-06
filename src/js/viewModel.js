/*
 * viewModel.js
 *
 * Copyright 2016 Milan Fort (http://www.milanfort.com/). All rights reserved.
 */

'use strict';

var ko = require('knockout'),
    _ = require('lodash'),
    model = Object.freeze(require('./model')),
    logger = require('./logging').getLogger(),
    util = require('./util'),
    map = require('./map'),
    init,
    reset,
    select,
    filter,
    viewModel;

init = function () {
    _(model).forEach(function (value) {
        viewModel.places.push(value);
    });

    map.init(model, function (title) {
        logger.trace("Clicked on marker for '%s'", title);
        viewModel.selected(title);
    });

    map.showAllMarkers();
};

reset = function () {
    viewModel.places.removeAll();
    viewModel.selected('');
    map.hideAllMarkers();
};

select = function (place) {
    logger.debug("Selecting place %j", place);
    viewModel.selected(place.title);
    map.bounceMarker(place.title);
};

filter = function () {
    var text = viewModel.filterText();

    logger.debug("Filtering places with text '%s'", text);

    reset();
    _(model).forEach(function (value) {
        if (util.contains(value.title, text)) {
            logger.debug("Found matching place '%s'", value.title);
            viewModel.places.push(value);
            map.showMarker(value.title);
            map.bounceMarker(value.title);
        }
    });

    return false;
};

viewModel = module.exports = {

    /** Places from model that are currently displayed. */
    places: ko.observableArray([]),

    /** Currently selected place from the list. */
    selected:  ko.observable(),

    /** Text from the search box used to filter places. */
    filterText: ko.observable(),

    init: init,

    select: select,

    filter: filter
};
