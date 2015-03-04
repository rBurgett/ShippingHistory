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
            'click .js-modalConfirm': 'confirmClicked',
            'click .js-modalCancel': 'cancelClicked',
            'keydown' : 'keyPressed'
        },
        keyPressed: function(e) {

            switch(e.which) {
                case 37:        //left
                    if(this.model.attributes.confirm) {
                        this.$('.js-modalConfirm').focus();
                    }
                    break;
                case 39:        //right
                    if(this.model.attributes.confirm) {
                        this.$('.js-modalCancel').focus();
                    }
                    break;
            }

        },
        okClicked: function(e) {
            e.preventDefault();
            this.trigger('ok');
            this.destroy();
        },
        confirmClicked: function(e) {
            e.preventDefault();
            this.trigger('confirm');
            this.destroy();
        },
        cancelClicked: function(e) {
            e.preventDefault();
            this.trigger('cancel');
            this.destroy();
        },
        initialize: function (options) {
            var size = options.size;
            var type = options.type || 'alert';
            this.model.set('headerText', options.headerText || '');
            this.model.set('bodyText', options.bodyText || '');

            if(size === 'small') {
                this.model.set('small', true);
            } else if(size === 'large') {
                this.model.set('large', true);
            }

            if (type === 'confirm') {
                this.model.set('confirm', true);
            } else {
                this.model.set('alert', true);
            }

            this.render();

        },
        onRender: function() {

            this.$('.modal').show();

            var mt =  '-' + (180 + (this.$('.modal-dialog').height())) / 2 + 'px';
            console.log(mt);
            this.$('.modal-dialog').css('margin-top', mt);

            if(this.model.attributes.alert) {
                this.$('.js-modalOk').focus();
            } else if(this.model.attributes.confirm) {
                this.$('.js-modalConfirm').focus();
            }

        },
        onDestroy: function() {
            $('body').append('<div class="js-modalView"></div>');
        }
    });

    return ModalView;
});