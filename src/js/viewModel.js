/*
 * viewModel.js
 *
 * Copyright 2016 Milan Fort (http://www.milanfort.com/). All rights reserved.
 */

//TODO: provide attribution about using information from wikipedia with license.

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

    map.init(model, function (place) {
        logger.trace("Clicked on marker for '%s'", place.title);
        select(place);
    });

    map.showAllMarkers();
};

reset = function () {
    viewModel.places.removeAll();
    viewModel.selected('');
    map.closeAllInfoWindows();
    map.hideAllMarkers();
};

select = function (place) {
    var WIKIPEDIA_URL =
        "http://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=true&exsentences=2&titles=";

    logger.debug("Selecting place %j", place);
    viewModel.selected(place.title);
    map.bounceMarker(place.title);

    $.ajax({
        type: 'GET',
        url: WIKIPEDIA_URL + encodeURIComponent(place.title),
        headers: {
            Accept: 'application/json'
        },
        contentType: 'application/json',
        dataType: 'jsonp',
        cache: true,
        timeout: 500

    }).done(function (data) {
        logger.debug("Wikipedia information for entry '%s' retrieved successfully", place.title);
        viewModel.error(false);
        viewModel.errorMessage('');

        var infoText = _.values(data.query.pages)[0].extract;
        map.closeAllInfoWindows();
        map.displayInfoWindow(place.title, infoText);

    }).fail(function () {
        logger.error("Failed to retrieve wikipedia information for entry '%s'", place.title);

        viewModel.error(true);
        viewModel.errorMessage('Could not retrieve data from Wikipedia for entry ' + place.title);
    });
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

    /** Indicates whether an error occurred. */
    error: ko.observable(false),

    /** Error description string. */
    errorMessage: ko.observable(''),

    init: init,

    select: select,

    filter: filter
};
