/*global define, console*/

define([
    'backbone',
    'backbone.marionette',
    'underscore',
    'jquery',
    'handlebars',
    'text!views/ShipmentsView.hbs',
    'text!views/ShipmentsItemView.hbs'

], function(Backbone, Marionette, _, $, Handlebars, shipmentsTemplate, shipmentsItemViewTemplate) {
    'use strict';

    var ShipmentModel = Backbone.Model.extend({
        defaults: {
            _id: '',
            trackingNumber: '',
            shipDate: '',
            deliveryDate: '',
            recipientID: '',
            contactName: '',
            companyName: '',
            address1: '',
            address2: '',
            city: '',
            state: '',
            zip: '',
            phone: '',
            recEmail: '',
            recEmailS: '',
            recEmailT: '',
            recEmailE: '',
            recEmailD: '',
            otherEmail1: '',
            otherEmail1S: '',
            otherEmail1T: '',
            otherEmail1E: '',
            otherEmail1D: '',
            otherEmail2: '',
            otherEmail2S: '',
            otherEmail2T: '',
            otherEmail2E: '',
            otherEmail2D: '',
            weight: '',
            serviceType: '',
            l: '',
            w: '',
            h: '',
            declaredValue: '',
            netCost: '',
            poNumber: '',
            customerReference: ''
        }
    });

    var ShipmentCollection = Backbone.Collection.extend({
        model: ShipmentModel
    });

    var ShipmentsItemView = Marionette.ItemView.extend({
        tagName: 'a',
        className: 'list-group-item',
        attributes: {
            href: '#'
        },
        template: function(model) {
            return Handlebars.default.compile(shipmentsItemViewTemplate)(model);
        },
        events: {

        },
        initialize: function() {

        }
    });

    var ShipmentsView = Marionette.CompositeView.extend({
        className: 'shipments-list',
        template: function(model) {
            return Handlebars.default.compile(shipmentsTemplate)(model);
        },
        childViewContainer: '.js-shipmentsItemsContainer',
        childView: ShipmentsItemView,
        collectionEvents: {
            'change': 'collectionChanged'
        },
        collectionChanged: function() {
            this.render();
        },
        events: {

        },
        initialize: function() {

        }
    });

    ShipmentsView.ShipmentCollection = ShipmentCollection;

    return ShipmentsView;
});