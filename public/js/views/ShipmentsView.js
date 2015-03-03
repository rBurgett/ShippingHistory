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
        modelEvents: {
            'change': 'modelChanged'
        },
        modelChanged: function() {
            console.log('model changed');
            this.render();
        },
        clicked: function(e) {
            e.preventDefault();
            this.trigger('loadShipment');
            this.trigger('setActive');
        },
        onRender: function() {
            if(this.model.attributes.isActive) {
                $(this.el).addClass('active');
                this.$('.text-muted').addClass('text-muted-white');
            } else if($(this.el).hasClass('active')) {
                $(this.el).removeClass('active');
                this.$('.text-muted').removeClass('text-muted-white');
            }
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
                    var afterData = _.after(data.length, function() {
                        loadingView.destroy();
                        parent.render();
                        parent.trigger('shipmentsLoaded');
                    });
                    _.each(data, function(item) {
                        item.isActive = false;
                        parent.collection.add(item);
                        afterData();
                    });
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
                'childview:loadShipment' : function(view) {
                    parent.trigger('loadShipment', view.model);
                },
                'childview:setActive' : function(view) {
                    var setActive = _.after(parent.collection.models.length, function() {
                        view.model.set({isActive: true});
                    });
                    _.each(parent.collection.models, function(model) {
                        model.set({isActive: false});
                        setActive();
                    });
                }
            });
        }
    });

    ShipmentsView.ShipmentCollection = ShipmentCollection;

    return ShipmentsView;
});