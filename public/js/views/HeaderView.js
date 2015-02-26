/*global define, console*/

define([
    'backbone',
    'backbone.marionette',
    'underscore',
    'jquery',
    'handlebars',
    'text!/js/views/HeaderView.hbs'

], function(Backbone, Marionette, _, $, Handlebars, headerTemplate) {
    'use strict';

    var HeaderView = Marionette.ItemView.extend({
        template: function(data) {
            return Handlebars.default.compile(headerTemplate);
        },
        initialize: function() {
            console.log(headerTemplate);
        }
    });

    return HeaderView;
});