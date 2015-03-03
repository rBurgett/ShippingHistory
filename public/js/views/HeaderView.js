/*global define, console*/

define([
    'backbone',
    'backbone.marionette',
    'underscore',
    'jquery',
    'handlebars',
    'text!views/HeaderView.hbs',
    'views/ModalView',
    'fileSaver'

], function(Backbone, Marionette, _, $, Handlebars, headerTemplate, ModalView, FileSaver) {
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
                }).alert({bodyText: message});
                parent.trigger('updateData');
            });
        },
        exportData: function(e) {
            e.preventDefault();

            var parent = this;

            $.ajax({
                url: "shipments",
                type: "GET"
            }).done(function(shipments) {
                var fixedShipments = [];
                var afterIdRemoved = _.after(shipments.length, function() {
                    var shipmentsJSON = JSON.stringify(fixedShipments, null);
                    var blob = new Blob([shipmentsJSON], {type: "data:text/json;charset=utf-8"});
                    saveAs(blob, 'Shipping_History.json');
                    parent.trigger('exportData');
           //         console.log(fixedShipments);
                });
                _.each(shipments, function(shipment) {
                    fixedShipments.push(_.omit(shipment, '_id'));
                    afterIdRemoved();
                });
  /*              var shipmentsJSON = JSON.stringify(shipments, null);
                var blob = new Blob([shipmentsJSON], {type: "data:text/json;charset=utf-8"});
                saveAs(blob, 'Shipping_History.json');
                parent.trigger('exportData'); */
            });
        },
        importData: function(e) {
            e.preventDefault();
            var parent = this;

            var readFile = new FileReader();
            readFile.onload = function(file) {
                var shipments = escape(file.target.result);
                $.ajax({
                    url: "shipments/import?shipments=" + shipments,
                    type: "POST"
                }).done(function(message) {
                    console.log(message);
                    var modalView = new ModalView({
                        model: new Backbone.Model()
                    }).alert({bodyText: message});
                    parent.trigger('importData');
                });
            };

            $('.js-importShipmentsFile').on('change', function(e) {
                readFile.readAsText(e.target.files[0]);
            }).click();

        },
        aboutShippingHistory: function(e) {
            e.preventDefault();
            var modalView = new ModalView({
                model: new Backbone.Model(),
                size: 'medium'
            }).alert({
                    headerText: 'About',
                    bodyText: '<p>This application was written by <a href="http://ryanburgett.com">Ryan Burgett</a> to provide a means for individuals and small businesses to keep track of shipping history from FedEx Ship Manager. Anyone who has used the software knows that it does not keep track of or provide means of viewing shipping history. That is where this app comes in.</p><p>This is a Javascript application, written with Express.js and MongoDB on Node for the backend and Backbone with Marionette and Handlebars templating on the front-end.</p><p>Feel free to check out this project on <a href="https://github.com/rBurgett/ShippingHistory">GitHub</a>. Enjoy!</p>'
                });
            this.trigger('aboutShippingHistory');
        },
        initialize: function() {

        }
    });

    return HeaderView;
});