/*global define, console*/

define([
    'backbone',
    'backbone.marionette',
    'underscore',
    'jquery',
    'handlebars',
    'text!views/BodyView.hbs',
    'views/SearchView'

], function(Backbone, Marionette, _, $, Handlebars, bodyTemplate, SearchView) {
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
        }
    });

    return BodyView;
});