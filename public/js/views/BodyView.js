/*global define, console*/

define([
    'backbone',
    'backbone.marionette',
    'underscore',
    'jquery',
    'handlebars',
    'text!views/BodyView.hbs',
    'views/SearchView',
    'views/ShipmentsView'

], function(Backbone, Marionette, _, $, Handlebars, bodyTemplate, SearchView, ShipmentsView) {
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

            var shipmentsView = new ShipmentsView({
                collection: new ShipmentsView.ShipmentCollection()
            });

            $.ajax({
                url: "shipments",
                type: "GET",
        //        data: { id : menuId },
        //        dataType: "html"
            }).done(function(data) {
                _.each(data, function(item) {
                    shipmentsView.collection.add(item);
                });
            });

            this.shipmentsRegion.show(shipmentsView);
        }
    });

    return BodyView;
});