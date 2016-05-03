'use strict';

var _ = require('lodash');

/* Berlin geo-coordinates */
var CENTER_LOCATION = {lat: 52.5167, lng: 13.4};

var googleMap = null;

var markers = {};

var detectBrowser = function () {
    var useragent = navigator.userAgent;
    var mapdiv = document.getElementById('map');

    if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1) {
        mapdiv.style.width = '100%';
        mapdiv.style.height = '100%';

    } else {
        mapdiv.style.width = '600px';
        mapdiv.style.height = '800px';
    }
};

var init = function (model, clickHandler) {
    console.log("Initializing google map");

    googleMap = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: CENTER_LOCATION,
        disableDefaultUI: true, //Disable map controls
        zoomControl: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    detectBrowser();

    _(model).forEach(function (item) {
        console.log("Creating marker for item ", item);

        var marker = new google.maps.Marker({
            position: item.coords,
            draggable: false,
            animation: google.maps.Animation.DROP,
            title: item.title
        });

        marker.addListener('click', function() {
            googleMap.setCenter(marker.getPosition());

            bounce(marker);

            clickHandler(item.title);
        });

        markers[item.title] = marker;
    });
};

var showMarker = function (title) {
    var marker = markers[title];
    console.log("Showing marker " + marker.title);
    marker.setMap(googleMap);
};

var bounce = function (marker) {
    console.log("Bouncing marker " + marker.title);

    marker.setAnimation(google.maps.Animation.BOUNCE);

    setTimeout(function() {
        marker.setAnimation(null);
    }, 700);
};

var bounceMarker = function (title) {
    bounce(markers[title])
};

var displayInfoWindow = function (title, message) {
    var marker = markers[title];

    var infowindow = new google.maps.InfoWindow({
        content: message
    });

    infowindow.open(googleMap, marker);
};

var showAllMarkers = function () {
    _.forEach(markers, function (value, key) {
        console.log("Showing marker " + key);

        value.setMap(googleMap);
    });
};

var hideAllMarkers = function () {
    _.forEach(markers, function (value, key) {
        console.log("Hiding marker " + key);

        value.setMap(null);
    });
};

module.exports = {

    init: init,

    showMarker: showMarker,

    bounceMarker: bounceMarker,

    displayInfoWindow: displayInfoWindow,

    showAllMarkers: showAllMarkers,

    hideAllMarkers: hideAllMarkers
};
