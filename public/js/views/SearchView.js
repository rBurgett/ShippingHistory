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
        template: function(model) {
            return Handlebars.default.compile(searchTemplate)(model);
        },
        events: {
            'click .js-searchData' : 'searchData',
            'click .js-closeSearch' : 'closeSearch'
        },
        searchData: function(e) {
            e.preventDefault();
            var target = $(e.currentTarget);
            var searchTerm = this.$('input').val();
            var field;

            if (!searchTerm) {
                return;
            }

            if (target.hasClass('js-searchContact')) {
                field = 'contactName';
            } else if (target.hasClass('js-searchCompany')) {
                field = 'companyName';
            } else if (target.hasClass('js-searchCity')) {
                field = 'city';
            } else if (target.hasClass('js-searchOrder')) {
                field = 'poNumber';
            } else if (target.hasClass('js-searchReference')) {
                field = 'customerReference';
            }

            this.model.set({
                value: searchTerm,
                field: field
            });
            this.$('.js-searchMessageContainer').show();

            this.trigger('searchData', {
                term: searchTerm,
                field: field
            });
        },
        closeSearch: function(e) {
            e.preventDefault();
            this.model.clear();
            this.$('.js-searchMessageContainer').hide();
            this.trigger('closeSearch');
        },
        initialize: function() {

            this.model.parentView = this;
            this.model.on({
                'change' : function() {
                    this.parentView.render();
                }
            });
        }
    });

    return SearchView;
});