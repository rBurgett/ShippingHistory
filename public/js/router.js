/*global define, console*/

define([
    'backbone',
    'backbone.marionette',
    'underscore',
    'jquery'

], function(Backbone, Marionette, _, $) {
    'use strict';

    var RouterController = Marionette.Controller.extend({
        'loadShipmentDetail': function(trackingNo) {
            this.trigger('shipment', trackingNo);
        }
    });

    var Router = Marionette.AppRouter.extend({
        controller: new RouterController,
        appRoutes: {
            'shipments/:tracking_no': 'loadShipmentDetail'
        }
    });

    return Router;
});