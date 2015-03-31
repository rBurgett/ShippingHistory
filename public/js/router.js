/*global define, console*/

define([
    'backbone',
    'backbone.marionette',
    'underscore',
    'jquery'

], function(Backbone, Marionette, _, $) {
    'use strict';

    var RouterController = Marionette.Controller.extend({
        'Shipment': function() {
            this.trigger('shipment');
        }
    });

    var Router = Marionette.AppRouter.extend({
        controller: new RouterController,
        appRoutes: {
            'shipment': 'Shipment'
        }
    });

    return Router;
});