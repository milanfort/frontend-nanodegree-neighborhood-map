'use strict';

/*global google */

var _ = require('lodash');

var logger = require('./logging').getLogger();

/* Berlin geo-coordinates */
var CENTER_LOCATION = {lat: 52.5167, lng: 13.4};

var googleMap = null;

var markers = {};

var infoWindows = [];

var bounce;

var init = function (model, clickHandler) {
    logger.info("Initializing google map");

    //TODO: test if google is defined; display error message if not

    googleMap = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: CENTER_LOCATION,
        disableDefaultUI: true, //Disable map controls
        zoomControl: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    _(model).forEach(function (item) {
        logger.debug("Creating marker for item %j", item);

        var marker = new google.maps.Marker({
            position: item.coords,
            draggable: false,
            animation: google.maps.Animation.DROP,
            title: item.title
        });

        marker.addListener('click', function() {
            bounce(marker);

            clickHandler(item);
        });

        markers[item.title] = marker;
    });
};

var showMarker = function (title) {
    var marker = markers[title];
    logger.debug("Showing marker '%s'", marker.title);
    marker.setMap(googleMap);
};

bounce = function (marker) {
    logger.debug("Bouncing marker '%s'", marker.title);

    marker.setAnimation(google.maps.Animation.BOUNCE);

    setTimeout(function() {
        marker.setAnimation(null);
    }, 700);
};

var bounceMarker = function (title) {
    bounce(markers[title]);
};

var displayInfoWindow = function (title, message) {
    var marker = markers[title];

    var infowindow = new google.maps.InfoWindow({
        content: message
    });

    infowindow.open(googleMap, marker);
    infoWindows.push(infowindow);
};

var closeAllInfoWindows = function () {
    logger.trace("Closing all info windows");

    _(infoWindows).forEach(function (infoWindow) {
        logger.trace("Closing info window %s", infoWindow.getContent());
        infoWindow.close();
    });

    infoWindows.length = 0;
};

var showAllMarkers = function () {
    _.forEach(markers, function (value, key) {
        logger.trace("Showing marker '%s'", key);

        value.setMap(googleMap);
    });
};

var hideAllMarkers = function () {
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
