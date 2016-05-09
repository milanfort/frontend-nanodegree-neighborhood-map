/*
 * map.js
 *
 * Copyright 2016 Milan Fort (http://www.milanfort.com/). All rights reserved.
 */

/**
 * This module implements map-related functionality.
 * It allows to display a map, show and hide place markers,
 * as well as display additional information in info windows.
 *
 * Please note that the map data are copyrighted by Google and its data providers.
 *
 * @module map
 * @type {{init, showMarker, bounceMarker, displayInfoWindow, closeAllInfoWindows,
 *         showAllMarkers, hideAllMarkers}}
 * @author Milan Fort (http://www.milanfort.com/)
 * @version 1.0
 * @since 1.0.0
 */

'use strict';

/*global google */

var googleMaps = require('google-maps'),
    _ = require('lodash'),
    logger = require('./logging').getLogger(),
    CENTER_LOCATION = {lat: 52.5167, lng: 13.4}, // Berlin geo-coordinates
    MAPS_LOAD_TIMEOUT = 3000,
    googleMap = null,
        markers = {},
    infoWindows = [],
    init,
    showMarker,
    bounceMarker,
    bounce,
    displayInfoWindow,
    closeAllInfoWindows,
    showAllMarkers,
    hideAllMarkers;

googleMaps.KEY = 'AIzaSyD_nkhrDT6GrZefEUBUofwRBZJGJBgQMdg';

/** Initializes this map module. */
init = function (model, clickHandler, errorHandler) {
    var loadTimeout;

    logger.info("Initializing google map");
    googleMaps.load(function (google) {
        if (typeof google === 'undefined') {
            errorHandler();
            return;
        }

        googleMap = new google.maps.Map(document.getElementById('map'), {
            zoom: 13,
            center: CENTER_LOCATION,
            disableDefaultUI: true, //Disable map controls
            zoomControl: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        _(model).forEach(function (item) {
            var marker;

            logger.debug("Creating marker for item %j", item);

            marker = new google.maps.Marker({
                position: item.coords,
                draggable: false,
                animation: google.maps.Animation.DROP,
                title: item.title
            });

            marker.addListener('click', function () {
                bounce(marker);
                clickHandler(item);
            });

            markers[item.title] = marker;
        });

        showAllMarkers();
    });

    loadTimeout = setTimeout(function () {
        logger.error("Timeout expired - failed to load google maps");
        errorHandler();

    }, MAPS_LOAD_TIMEOUT);

    googleMaps.onLoad(function () {
        logger.info("Google maps loaded successfully");
        clearTimeout(loadTimeout);
    });
};

/**
 * Shows a marker on the map for the place with the given title.
 *
 * @param {string} title - Title of the place for which marker should be shown.
 */
showMarker = function (title) {
    var marker = markers[title];
    logger.debug("Showing marker '%s'", marker.title);
    marker.setMap(googleMap);
};

/**
 * Animates the provided marker using bounce animation.
 *
 * @param {google.maps.Marker} marker - Marker to bounce.
 */
bounce = function (marker) {
    logger.debug("Bouncing marker '%s'", marker.title);

    marker.setAnimation(google.maps.Animation.BOUNCE);

    setTimeout(function () {
        marker.setAnimation(null);
    }, 700);
};

/**
 * Animates the marker corresponding to the place with the provided title.
 *
 * @param {string} title - Title of place for which the marker should bounce.
 */
bounceMarker = function (title) {
    bounce(markers[title]);
};

/**
 * Opens an info window for the given place with the given message.
 *
 * @param {string} title - Title of place for which an info window should be displayed.
 * @param {string} message - Message to display in the info window.
 */
displayInfoWindow = function (title, message) {
    var marker = markers[title],
        infoWindow;

    infoWindow = new google.maps.InfoWindow({
        content: message
    });

    infoWindow.open(googleMap, marker);
    infoWindows.push(infoWindow);
};

/** Closes all info windows. */
closeAllInfoWindows = function () {
    logger.trace("Closing all info windows");

    _(infoWindows).forEach(function (infoWindow) {
        logger.trace("Closing info window %s", infoWindow.getContent());
        infoWindow.close();
    });

    infoWindows.length = 0;
};

/** Shows markers for all places defined in applications data model. */
showAllMarkers = function () {
    _.forEach(markers, function (value, key) {
        logger.trace("Showing marker '%s'", key);

        value.setMap(googleMap);
    });
};

/** Hides all markers currentlly shown on the map. */
hideAllMarkers = function () {
    _.forEach(markers, function (value, key) {
        logger.trace("Hiding marker '%s'", key);

        value.setMap(null);
    });
};

module.exports = {

    init: init,

    showMarker: showMarker,

    bounceMarker: bounceMarker,

    displayInfoWindow: displayInfoWindow,

    closeAllInfoWindows: closeAllInfoWindows,

    showAllMarkers: showAllMarkers,

    hideAllMarkers: hideAllMarkers
};
