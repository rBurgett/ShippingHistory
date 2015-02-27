/*global require, define, console*/

require.config({
    baseUrl: '/',

    paths: {
        text: 'requirejs-text/text',
        jquery: 'jquery/dist/jquery',
        backbone: 'backbone/backbone',
        underscore: 'underscore/underscore',
        'backbone.marionette': 'backbone.marionette/lib/backbone.marionette',
        'backbone.wreqr': 'backbone.wreqr/lib/backbone.wreqr',
        'backbone.babysitter': 'backbone.babysitter/lib/backbone.babysitter',
        'handlebars': 'handlebars/handlebars.amd',
        'bootstrap': 'js/bootstrap'
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
    'js/views/HeaderView',
    'text!/js/views/HeaderView.hbs'
],
function(Marionette, bootstrap, HeaderView, headerTemplate) {
    'use strict';

    var app = new Marionette.Application();

    app.addRegions({
        headerRegion: '.headerRegion',
        bodyRegion: '.bodyRegion',
        loadingRegion: '.loadingRegion',
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

    /*    var bodyView = new BodyView();
        app.bodyRegion.show(bodyView);
        var loadingView = new LoadingView();
        app.loadingRegion.show(loadingView);
        var footerView = new FooterView();
        app.footerRegion.show(footerView);*/
    });

    app.start();

});