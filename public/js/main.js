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
    'handlebars'
],
function(Marionette, bootstrap, HeaderView, BodyView, Handlebars) {
    'use strict';

    Handlebars.default.registerHelper("phoneFormat", function(phoneNumber) {
        phoneNumber = phoneNumber.toString();
        return "(" + phoneNumber.substr(0,3) + ") " + phoneNumber.substr(3,3) + "-" + phoneNumber.substr(6,4);
    });
    Handlebars.default.registerHelper("serviceFormat", function(service) {
        switch(service) {
            case 90:
                return 'Home';
            case 92:
                return 'Ground';
            case 1:
                return 'Priority Overnight';
        }
        return service;
    });
    Handlebars.default.registerHelper("emailNotFormat", function(notification) {
        if (notification === 'Y') {
            return '<span class="glyphicon glyphicon-ok"></span>';
        } else {
            return ' ';
        }
    });

    var app = new Marionette.Application();

    app.addRegions({
        headerRegion: '.headerRegion',
        bodyRegion: '.bodyRegion',
        footerRegion: '.footerRegion'
    });

    app.on('start', function() {

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