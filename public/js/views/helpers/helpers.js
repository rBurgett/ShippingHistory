/*global define, console*/

define([
    'handlebars'

], function(Handlebars) {
    'use strict';

    Handlebars.default.registerHelper("phoneFormat", function(phoneNumber) {
        phoneNumber = phoneNumber.toString();
        return "(" + phoneNumber.substr(0,3) + ") " + phoneNumber.substr(3,3) + "-" + phoneNumber.substr(6,4);
    });

    Handlebars.default.registerHelper("serviceFormat", function(service) {
        switch(service) {
            case 90:
                return 'Home';
            case 92:
                return 'Ground';
            case 20:
                return 'Express Saver';
            case 3:
                return '2 Day';
            case 49:
                return '2 Day AM';
            case 5:
                return 'Standard Overnight';
            case 1:
                return 'Priority Overnight';
            case 6:
                return 'First Overnight';
        }
        return service;
    });

    Handlebars.default.registerHelper("emailNotFormat", function(notification) {
        if (notification === 'Y') {
            return '<span class="glyphicon glyphicon-ok"></span>';
        } else {
            return ' ';
        }
    });

    Handlebars.default.registerHelper("costFormat", function(costNum) {
        return '$' + costNum.toFixed(2);
    });

    Handlebars.default.registerHelper("valueFormat", function(valueNum) {
        return '$' + valueNum.toFixed();
    });

    return this;
});