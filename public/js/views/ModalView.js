/*global define, console*/

/**************Implementation*****************

var modalView = new ModalView({
    model: new Backbone.Model()
}).alert('Here is a message!');

*********************************************/

define([
    'backbone',
    'backbone.marionette',
    'underscore',
    'jquery',
    'handlebars',
    'text!views/ModalView.hbs',
    'bootstrap'

], function(Backbone, Marionette, _, $, Handlebars, modalTemplate, bootstrap) {
    'use strict';

    var ModalView = Marionette.ItemView.extend({
        el: '.js-modalView',
        template: function(model) {
            return Handlebars.default.compile(modalTemplate)(model);
        },
        events: {
            'click .js-modalOk' : 'okClicked',
            'keypress' : 'okPressed'
        },
        okPressed: function(e) {
    //        e.preventDefault();
            if(e.which === 13) {
                this.destroy();
            }
        },
        okClicked: function(e) {
            e.preventDefault();
            this.destroy();
        },
        initialize: function () {

            this.alert = function(message) {
                this.model.set('message', message);
                this.render();
            };

        },
        onRender: function(options) {

            this.$('.modal').show();
        },
        onDestroy: function() {
            $('body').append('<div class="js-modalView"></div>');
        }
    });

    return ModalView;
});