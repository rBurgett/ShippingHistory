/*global define, console*/

define([
    'backbone',
    'backbone.marionette',
    'underscore',
    'jquery',
    'handlebars',
    'text!views/ShipmentsView.hbs',
    'text!views/ShipmentsItemView.hbs',
    'models/ShipmentModel'

], function(Backbone, Marionette, _, $, Handlebars, shipmentsTemplate, shipmentsItemViewTemplate, ShipmentModel) {
    'use strict';

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
            'click': 'clicked'
        },
        clicked: function(e) {
            e.preventDefault();
            this.trigger('loadShipment');
        },
        initialize: function() {

        }
    });

    var ShipmentsView = Marionette.CompositeView.extend({
        className: 'shipments-list',
        template: function(model) {
            return Handlebars.default.compile(shipmentsTemplate)(model);
        },
        events: {
            'click .js-loadMore': 'loadMore'
        },
        childViewContainer: '.js-shipmentsItemsContainer',
        childView: ShipmentsItemView,
        collectionEvents: {
            'change': 'collectionChanged'
        },
        collectionChanged: function() {
            this.render();
        },
        qp: '',
        load: function(queryParams) {
            this.$('.js-noShipments').hide();
            this.$('.js-loadMore').show();
            this.trigger('shipmentsLoading');
            this.collection.reset();
            if (queryParams) {this.qp = queryParams;}
            var parent = this;
            $.ajax({
                url: "shipments",
                type: "GET",
                data: parent.qp
            }).done(function(data) {
                if(data.length > 0) {
                    _.each(data, function(item) {
                        parent.collection.add(item);
                    });
                    parent.trigger('shipmentsLoaded');
                } else {
                    console.log('none to display');
                    parent.$('.js-noShipments').show();
                    parent.$('.js-loadMore').hide();
                    parent.trigger('shipmentsLoaded');
                }

            });
        },
        loadMore: function(e) {
            e.preventDefault();
            console.log('loading more!');
            if(!this.qp.q) {
                return;
            } else {
                this.qp.q = this.qp.q + 25;
                this.load('');
            }
        },
        initialize: function() {
            var parent = this;
            this.trigger('loadShipment');
            this.on({
                'childview:loadShipment' : function(item) {
                    parent.trigger('loadShipment', item.model);
                }
            });
        }
    });

    ShipmentsView.ShipmentCollection = ShipmentCollection;

    return ShipmentsView;
});