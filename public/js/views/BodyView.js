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
    'views/LoadingView'

], function(Backbone, Marionette, _, $, Handlebars, bodyTemplate, SearchView, ShipmentsView, ShipmentDetailView, LoadingView) {
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

            var parent = this;

            var loadingView = new LoadingView();

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
                },
                closeSearch: function() {
                    console.log('Search has been closed!');
                }
            });

            var shipmentDetailView = new ShipmentDetailView({
                model: new ShipmentDetailView.ShipmentModel()
            });

            this.shipmentDetailRegion.show(shipmentDetailView);

            var shipmentsView = new ShipmentsView({
                collection: new ShipmentsView.ShipmentCollection()
            });

            this.shipmentsRegion.show(shipmentsView);

            shipmentsView.on({
                loadShipment: function(model) {
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
        }
    });

    return BodyView;
});