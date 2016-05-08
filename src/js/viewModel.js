/*
 * viewModel.js
 *
 * Copyright 2016 Milan Fort (http://www.milanfort.com/). All rights reserved.
 */

/**
 * This module implements the application functionality using the knockout.js framework.
 * It represents the ViewModel part of the Model-View-ViewModel (MVVM) architectural pattern.
 *
 * As part of its implementation, this module accesses free content from
 * {@link https://en.wikipedia.org/wiki/Main_Page|Wikipedia},
 * in compliance with its
 * {@link https://wikimediafoundation.org/wiki/Terms_of_Use|terms of use}.
 *
 * @module viewModel
 * @type {{places, selected, filterText, error, errorMessage, init, select, filter}}
 *
 * @author Milan Fort (http://www.milanfort.com/)
 * @version 1.0
 * @see module:util
 * @since 1.0.0
 */

'use strict';

var ko = require('knockout'),
    _ = require('lodash'),
    $ = require('jquery'),
    model = Object.freeze(require('./model')),
    logger = require('./logging').getLogger(),
    util = require('./util'),
    map = require('./map'),
    init,
    reset,
    select,
    filter,
    viewModel;

require('bootstrap');

/** Initializes this module. */
init = function () {
    _(model).forEach(function (value) {
        viewModel.places.push(value);
    });

    try {
        map.init(model, function (place) {
            logger.trace("Clicked on marker for '%s'", place.title);
            select(place);
        });
        map.showAllMarkers();

        viewModel.error(false);

    } catch (error) {
        viewModel.error(true);
        viewModel.errorMessage(error.message);
    }
};

/** Resets the application state. */
reset = function () {
    viewModel.places.removeAll();
    viewModel.selected('');
    map.closeAllInfoWindows();
    map.hideAllMarkers();
};

/**
 * Selects a place on the map, highlights it in the list,
 * retrieves the information about the place from wikipedia,
 * and displays it in an info window.
 *
 * @param {{id, title, coords}} place - a place from model to select.
 * @see module:model
 */
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
        var infoText = _.values(data.query.pages)[0].extract;
        logger.debug("Wikipedia information for entry '%s' retrieved successfully", place.title);
        viewModel.error(false);
        viewModel.errorMessage('');
        map.closeAllInfoWindows();
        map.displayInfoWindow(place.title, infoText);

    }).fail(function () {
        logger.error("Failed to retrieve wikipedia information for entry '%s'", place.title);

        viewModel.error(true);
        viewModel.errorMessage('Could not retrieve data from Wikipedia for entry ' + place.title);
    });
};

/**
 * Filters the list of places according to the filter text specified in the input field.
 * Filtering is case-insensitive and ignores any leading or trailing spaces.
 *
 * @returns {boolean} _false_ in order to prevent the default functionality of submit button.
 */
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
