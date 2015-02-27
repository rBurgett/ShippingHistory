/*global require, define, console*/

require.config({
    baseUrl: 'js',

    paths: {
        text: 'bower/requirejs-text/text',
        jquery: 'bower/jquery/dist/jquery',
        backbone: 'bower/backbone/backbone',
        underscore: 'bower/underscore/underscore',
        'backbone.marionette': 'bower/backbone.marionette/lib/backbone.marionette',
        'backbone.wreqr': 'bower/backbone.wreqr/lib/backbone.wreqr',
        'backbone.babysitter': 'bower/backbone.babysitter/lib/backbone.babysitter',
        'handlebars': 'bower/handlebars/handlebars.amd',
        'bootstrap': 'bootstrap'
    },

    shim: {
        backbone: {
            deps: [
                'jquery',
                'underscore'
            ]
        },
        bootstrap: {
            deps: [
                'jquery'
            ]
        }
    }
});

define([
    'backbone.marionette',
    'bootstrap',
    'views/HeaderView',
    'views/BodyView'
],
function(Marionette, bootstrap, HeaderView, BodyView) {
    'use strict';

    var app = new Marionette.Application();

    app.addRegions({
        headerRegion: '.headerRegion',
        bodyRegion: '.bodyRegion',
        footerRegion: '.footerRegion'
    });

    app.on('start', function() {
        var headerView = new HeaderView();
        app.headerRegion.show(headerView);

        headerView.on({
            updateData: function() {
                console.log('updateData event fired!');
            },
            exportData: function() {
                console.log('exportData event fired!');
            },
            importData: function() {
                console.log('importData event fired!');
            },
            aboutShippingHistory: function() {
                console.log('aboutShippingHistory event fired!');
            }
        });

        var bodyView = new BodyView();
        app.bodyRegion.show(bodyView);

    /*    var loadingView = new LoadingView();
        app.loadingRegion.show(loadingView);
        var footerView = new FooterView();
        app.footerRegion.show(footerView);*/
    });

    app.start();

});