/*global define, console*/

define([
    'backbone',
    'backbone.marionette',
    'underscore',
    'jquery',
    'handlebars',
    'text!views/BodyView.hbs',
    'views/SearchView',
    'views/ShipmentsView',
    'views/ShipmentDetailView',
    'views/LoadingView',
    'router'

], function(Backbone, Marionette, _, $, Handlebars, bodyTemplate, SearchView, ShipmentsView, ShipmentDetailView, LoadingView, Router) {
    'use strict';

    var BodyView = Marionette.LayoutView.extend({
        template: function(data) {
            return Handlebars.default.compile(bodyTemplate)(data);
        },
        regions: {
            searchRegion: '.js-searchRegion',
            shipmentsRegion: '.js-shipmentsRegion',
            shipmentDetailRegion: '.js-shipmentDetailRegion'
        },
        initialize: function() {

        },
        onRender: function() {

            var router = new Router;

            var parent = this;

            var loadingView = new LoadingView();

            var shipmentsView = new ShipmentsView({
                collection: new ShipmentsView.ShipmentCollection()
            });

            this.shipmentsRegion.show(shipmentsView);

            shipmentsView.on({
                loadShipment: function(model) {

                    var route = '//shipments/' + model.attributes.trackingNumber;
                    router.navigate(route);

                    shipmentDetailView.setModel(model);
                },
                shipmentsLoading: function() {

                },
                shipmentsLoaded: function() {

                }
            });

            shipmentsView.load({
                q: 25
            });

            var searchView = new SearchView({
                model: new Backbone.Model({
                    defaults: {
                        value: '',
                        field: ''
                    }
                })
            });
            this.searchRegion.show(searchView);
            searchView.on({
                searchData: function(options) {
                    console.log('Search for ' + options.field + ' containing "' + options.term + '".');
                    shipmentsView.load({
                        q: 10,
                        term: options.term,
                        field: options.field
                    });
                },
                closeSearch: function() {
                    shipmentsView.load({
                        q: 25
                    });
                }
            });

            var shipmentDetailView = new ShipmentDetailView({
                model: new ShipmentDetailView.ShipmentModel()
            });



            router.controller.on({
                shipment: function(trackingNo) {

                    $.ajax({
                        url: "shipments/" + trackingNo,
                        type: "GET"
                    }).done(function(data) {

                        var model = new Backbone.Model.extend();

                        model.attributes = data;

                        shipmentDetailView.setModel(model);
                    });

                    console.log('You are at shipment #' + trackingNo + '!');
                }
            });

            Backbone.history.start();

            this.shipmentDetailRegion.show(shipmentDetailView);

        }
    });

    return BodyView;
});