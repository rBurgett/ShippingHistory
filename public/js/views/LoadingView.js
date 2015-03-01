/*global define, console*/

define([
    'backbone',
    'backbone.marionette',
    'underscore',
    'jquery',
    'handlebars',
    'text!views/LoadingView.hbs'

], function(Backbone, Marionette, _, $, Handlebars, loadingTemplate) {
    'use strict';

    var LoadingView = Marionette.ItemView.extend({
        template: function(model) {
            return Handlebars.default.compile(loadingTemplate)(model);
        }
    });

    return LoadingView;
});