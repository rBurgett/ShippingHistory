/*global define, console*/

define([
    'backbone',
    'backbone.marionette',
    'underscore',
    'jquery',
    'handlebars',
    'text!views/ShipmentDetailView.hbs',
    'models/ShipmentModel'

], function(Backbone, Marionette, _, $, Handlebars, shipmentDetailViewTemplate, ShipmentModel) {
    'use strict';

    var shipmentModel = new ShipmentModel();

    var ShipmentDetailView = Marionette.ItemView.extend({

        template: function(model) {
            return Handlebars.default.compile(shipmentDetailViewTemplate)(model);
        },
        setModel: function(model) {
            this.model.attributes = model.attributes;
            this.render();
        },
        initialize: function() {

        }
    });

    ShipmentDetailView.ShipmentModel = ShipmentModel;

    return ShipmentDetailView;
});