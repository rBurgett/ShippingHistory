/*global define, console*/

define([
    'backbone',
    'backbone.marionette',
    'underscore',
    'jquery',
    'handlebars',
    'text!views/ShipmentsView.hbs'

], function(Backbone, Marionette, _, $, Handlebars, shipmentsTemplate) {
    'use strict';

    var ShipmentsView = Marionette.CompositeView.extend({
        template: function(model) {
            return Handlebars.default.compile(shipmentsTemplate)(model);
        },
        childViewContainer: '.js-shipmentsItemsContainer',
        events: {

        },
        initialize: function() {

        }
    });

    return ShipmentsView;
});