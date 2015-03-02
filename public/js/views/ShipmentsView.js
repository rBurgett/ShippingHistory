/*global define, console*/

define([
    'backbone',
    'backbone.marionette',
    'underscore',
    'jquery',
    'handlebars',
    'text!views/ShipmentsView.hbs',
    'text!views/ShipmentsItemView.hbs',
    'models/ShipmentModel',
    'views/LoadingView'

], function(Backbone, Marionette, _, $, Handlebars, shipmentsTemplate, shipmentsItemViewTemplate, ShipmentModel, LoadingView) {
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
            this.$('.js-shipmentsItemsContainer').hide();
            var loadingView = new LoadingView({
                el: this.$('.js-loadingContainer')
            }).render();
            this.$('.js-loadingContainer').show();
            this.$('.js-noShipments').hide();
            this.$('.js-loadMoreContainer').hide();
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
                    loadingView.destroy();
                    parent.$('.js-shipmentsItemsContainer').show();
                    parent.$('.js-loadMoreContainer').show();
                    parent.trigger('shipmentsLoaded');
                } else {
                    loadingView.destroy();
                    parent.$('.js-noShipments').show();
                    parent.trigger('shipmentsLoaded');
                }

            });
        },
        loadMore: function(e) {
            e.preventDefault();
            this.qp.q = this.qp.q + 25;
            this.load('');
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