/*global define, console*/

define([
    'backbone',
    'backbone.marionette',
    'underscore',
    'jquery',
    'handlebars',
    'text!views/SearchView.hbs'

], function(Backbone, Marionette, _, $, Handlebars, searchTemplate) {
    'use strict';

    var SearchView = Marionette.ItemView.extend({
        template: function(data) {
            return Handlebars.default.compile(searchTemplate)(data);
        },
        events: {
            'click .js-search' : 'searchData'
        },
        searchData: function(e) {
            e.preventDefault();
            this.trigger('searchData');
        },
        initialize: function() {

        }
    });

    return SearchView;
});