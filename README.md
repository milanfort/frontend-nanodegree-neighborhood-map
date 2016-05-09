# Neighborhood Map


## Introduction

This repository contains a solution to assignment #5 of the Udacity's Front-End Web Developer Nanodegree Programme.

The task was to develop a single page application (SPA) that features a map of a particular neighborhood.
The application must contain a static data model with a set of places that must be shown on the map using markers
as well as in a simple list view. The application must support filtering of the list view as well as the markers on the map.
Additional third-party data about these places must be retrieved asynchronously using Ajax when
user selects a particular place either on the map or from the list view.
Proper error handling must be implemented in case when the third-party API in not available. 
All dynamic functionality within the application must be implemented using the [Knockout.js](http://knockoutjs.com/)
Model-View-View Model (MVVM) framework.
Finally, the application must have a responsive user interface and be usable across
all modern desktop, tablet, and phone browsers.


## Live Version

This solution is deployed through GitHub Pages at the following URL:
[http://www.milanfort.com/frontend-nanodegree-neighborhood-map/](http://www.milanfort.com/frontend-nanodegree-neighborhood-map/).


## Installation Instructions

To run the web application locally, please follow these steps:

1. [Install Node.js](https://nodejs.org/en/download/)

2. Install [Gulp](http://gulpjs.com/) globally:
    ```
    $ npm install -g gulp
    ```

3. Clone this git repository:
    ```
    $ git clone https://github.com/milanfort/frontend-nanodegree-neighborhood-map.git
    ```

4. Change your working directory to _frontend-nanodegree-neighborhood-map_

5. Install dependencies:
    ```
    $ npm install
    ```

6. Optionally, run `gulp lint` to validate JavaScript source files using [JSHint](http://jshint.com/)

7. Optionally, run `gulp style` to check code style of JavaScript source files using [JSCS](http://jscs.info/)

8. Optionally, run `gulp a11y` to verify accessibility of HTML source files using [A11Y Project](http://a11yproject.com/)

9. Optionally, run `gulp test` to run all unit tests using [Mocha](https://mochajs.org/) JavaScript testing framework

10. Optionally, run `gulp docs` to generate [JSDoc](http://usejsdoc.org/) API Documentation to _docs_ directory

11. Run `gulp serve`. The application will open automatically in your default browser


## Disclaimer

* This project uses [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/),
in compliance with its [terms of service](https://developers.google.com/maps/terms).

* This project accesses free content from [Wikipedia](https://en.wikipedia.org/wiki/Main_Page),
in compliance with its [terms of use](https://wikimediafoundation.org/wiki/Terms_of_Use).
