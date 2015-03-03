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
                this.trigger('ok');
                this.destroy();
            }
        },
        okClicked: function(e) {
            e.preventDefault();
            this.trigger('ok');
            this.destroy();
        },
        initialize: function (options) {
            var size = options.size;
            var type = options.type || 'alert';
            this.model.set('headerText', options.headerText || '');
            this.model.set('bodyText', options.bodyText || '');
       //     this.model.set('');
      //      this.render();

            console.log(type);

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

            console.log(this.model.attributes);

            this.render();

        },
        onRender: function() {

            /*if(this.size === 'medium') {
                this.$('.modal-dialog').removeClass('modal-sm');
                this.$('.modal').addClass('modal-higher');
            } else if(this.size === 'large') {
                this.$('.modal-dialog').removeClass('modal-sm');
                this.$('.modal-dialog').addClass('modal-lg');
            }

            if(this.type === 'alert') {
                this.$('.js-alertFooter').show();
            } else if(this.type === 'confirm') {
                this.$('.js-confirmFooter').show();
            }*/

            this.$('.modal').show();
     //       this.$('.js-modalOk').focus();
        },
        onDestroy: function() {
            $('body').append('<div class="js-modalView"></div>');
        }
    });

    return ModalView;
});