/*global define, console*/

define([
    'backbone',
    'backbone.marionette',
    'underscore',
    'jquery',
    'handlebars',
    'text!views/HeaderView.hbs'

], function(Backbone, Marionette, _, $, Handlebars, headerTemplate) {
    'use strict';

    var HeaderView = Marionette.ItemView.extend({
        template: function(data) {
            return Handlebars.default.compile(headerTemplate);
        },
        events: {
            'click .js-update' : 'updateData',
            'click .js-export' : 'exportData',
            'click .js-import' : 'importData',
            'click .js-about' : 'aboutShippingHistory'
        },
        updateData: function(e) {
            e.preventDefault();
            this.trigger('updateData');
        },
        exportData: function(e) {
            e.preventDefault();
            this.trigger('exportData');
        },
        importData: function(e) {
            e.preventDefault();
            this.trigger('importData');
        },
        aboutShippingHistory: function(e) {
            e.preventDefault();
            this.trigger('aboutShippingHistory');
        },
        initialize: function() {

        }
    });

    return HeaderView;
});