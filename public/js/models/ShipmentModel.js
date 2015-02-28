/*global define*/

define([
    'backbone'

], function(Backbone) {
    'use strict';

    var ShipmentModel = Backbone.Model.extend({
        defaults: {
            _id: '',
            trackingNumber: '',
            shipDate: '',
            deliveryDate: '',
            recipientID: '',
            contactName: '',
            companyName: '',
            address1: '',
            address2: '',
            city: '',
            state: '',
            zip: '',
            phone: '',
            recEmail: '',
            recEmailS: '',
            recEmailT: '',
            recEmailE: '',
            recEmailD: '',
            otherEmail1: '',
            otherEmail1S: '',
            otherEmail1T: '',
            otherEmail1E: '',
            otherEmail1D: '',
            otherEmail2: '',
            otherEmail2S: '',
            otherEmail2T: '',
            otherEmail2E: '',
            otherEmail2D: '',
            weight: '',
            serviceType: '',
            l: '',
            w: '',
            h: '',
            declaredValue: '',
            netCost: '',
            poNumber: '',
            customerReference: ''
        }
    });

    return ShipmentModel;
});