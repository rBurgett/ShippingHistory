/*global require, define, console*/

require.config({
    baseUrl: '/',

    paths: {
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
    'backbone.marionette', 'jquery', 'backbone', 'underscore','backbone.wreqr','backbone.babysitter'
],
function(Marionette) {
    'use strict';

});