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
        'backbone.babysitter': 'backbone.babysitter/lib/backbone.babysitter'
    },

    shim: {
        backbone: {
            deps: [
                'jquery',
                'underscore'
            ]

        }
    }
});

define([
    'backbone.marionette',
    'js/views/HeaderView',
    'text!/js/views/HeaderView.hbs'
],
function(Marionette, HeaderView, headerTemplate) {
    'use strict';

    console.log(headerTemplate);

    var app = new Marionette.Application();

    app.addRegions({
        headerRegion: '.headerRegion',
        bodyRegion: '.bodyRegion',
        loadingRegion: '.loadingRegion',
        footerRegion: '.footerRegion'
    });

    app.on('start', function() {
        var headerView = new HeaderView();
     /*   app.headerRegion.show(headerView);
        var bodyView = new BodyView();
        app.bodyRegion.show(bodyView);
        var loadingView = new LoadingView();
        app.loadingRegion.show(loadingView);
        var footerView = new FooterView();
        app.footerRegion.show(footerView);*/
    });

    app.start();

});