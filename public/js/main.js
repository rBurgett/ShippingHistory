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
        'helpers': 'views/helpers/helpers',
        'bootstrap': 'bootstrap',
        'fileSaver': 'bower/FileSaver/FileSaver'
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
    'views/BodyView',
    'handlebars',
    'helpers',
    'router',
        'backbone'
],
function(Marionette, bootstrap, HeaderView, BodyView, Handlebars, helpers, Router, Backbone) {
    'use strict';

    var router = new Router;

    router.controller.on({
        shipment: function() {
            console.log('You are at shipment!');
        }
    });

    var app = new Marionette.Application();

    app.addRegions({
        headerRegion: '.headerRegion',
        bodyRegion: '.bodyRegion',
        footerRegion: '.footerRegion'
    });

    app.on('start', function() {

        Backbone.history.start();

        var headerView = new HeaderView();
        app.headerRegion.show(headerView);

        var bodyView = new BodyView();
        app.bodyRegion.show(bodyView);

        headerView.on({
            updateData: function() {
                bodyView.shipmentsRegion.currentView.load({
                    q: 25
                });
            },
            exportData: function() {
    //            console.log('exportData event fired!');
            },
            importData: function() {
                bodyView.shipmentsRegion.currentView.load({
                    q: 25
                });
            },
            aboutShippingHistory: function() {
    //            console.log('aboutShippingHistory event fired!');
            }
        });

    });

    app.start();

});
