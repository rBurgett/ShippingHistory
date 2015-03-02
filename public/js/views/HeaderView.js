/*global define, console*/

define([
    'backbone',
    'backbone.marionette',
    'underscore',
    'jquery',
    'handlebars',
    'text!views/HeaderView.hbs',
    'views/ModalView'

], function(Backbone, Marionette, _, $, Handlebars, headerTemplate, ModalView) {
    'use strict';

    var HeaderView = Marionette.ItemView.extend({
        template: function(data) {
            return Handlebars.default.compile(headerTemplate)(data);
        },
        events: {
            'click .js-update' : 'updateData',
            'click .js-export' : 'exportData',
            'click .js-import' : 'importData',
            'click .js-about' : 'aboutShippingHistory'
        },
        updateData: function(e) {
            e.preventDefault();
            var parent = this;

            $.ajax({
                url: "updateDB",
                type: "POST"
            }).done(function(message) {
                var modalView = new ModalView({
                    model: new Backbone.Model(),
                    size: 'small'
                }).alert(message);
                parent.trigger('updateData');
            });
        },
        exportData: function(e) {
            e.preventDefault();
            this.trigger('exportData');
        },
        importData: function(e) {
            e.preventDefault();
            var parent = this;

            var readFile = new FileReader();
            readFile.onload = function(file) {
                var shipments = file.target.result;
                $.ajax({
                    url: "shipments/import",
                    data: {
                        shipments: shipments
                    },
                    type: "POST"
                }).done(function(message) {
                    var modalView = new ModalView({
                        model: new Backbone.Model()
                    }).alert(message);
                    parent.trigger('importData');
                });
            };

            $('.js-importShipmentsFile').on('change', function(e) {
                readFile.readAsText(e.target.files[0]);
            }).click();

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