/*global require, console*/

var express = require('express'),
    exphbs = require('express-handlebars'),
    mongoose = require('mongoose'),
    fs = require('fs'),
    csv = require('csv'),
    _ = require('lodash'),
    app = express();
/***********MongoDB/Mongoose setup*************************************/
mongoose.connect('mongodb://localhost/shippingHistoryDB');

var shipmentSchema = mongoose.Schema({
    trackingNumber: Number,
    shipDate: String,
    deliveryDate: Number,
    recipientID: String,
    contactName: String,
    companyName: String,
    address1: String,
    address2: String,
    city: String,
    state: String,
    zip: Number,
    phone: String,
    recEmail: String,
    recEmailS: String,
    recEmailT: String,
    recEmailE: String,
    recEmailD: String,
    otherEmail1: String,
    otherEmail1S: String,
    otherEmail1T: String,
    otherEmail1E: String,
    otherEmail1D: String,
    otherEmail2: String,
    otherEmail2S: String,
    otherEmail2T: String,
    otherEmail2E: String,
    otherEmail2D: String,
    weight: Number,
    serviceType: Number,
    l: Number,
    w: Number,
    h: Number,
    declaredValue: Number,
    netCost: Number,
    poNumber: String,
    customerReference: String
});
var Shipment = mongoose.model('Shipment', shipmentSchema);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
 //   'use strict';
 /*   var shipmentSchema = mongoose.Schema({
        trackingNumber: Number,
        shipDate: String,
        deliveryDate: Number,
        recipientID: String,
        contactName: String,
        companyName: String,
        address1: String,
        address2: String,
        city: String,
        state: String,
        zip: Number,
        phone: String,
        recEmail: String,
        recEmailS: String,
        recEmailT: String,
        recEmailE: String,
        recEmailD: String,
        otherEmail1: String,
        otherEmail1S: String,
        otherEmail1T: String,
        otherEmail1E: String,
        otherEmail1D: String,
        otherEmail2: String,
        otherEmail2S: String,
        otherEmail2T: String,
        otherEmail2E: String,
        otherEmail2D: String,
        weight: Number,
        serviceType: Number,
        l: Number,
        w: Number,
        h: Number,
        declaredValue: Number,
        netCost: Number,
        poNumber: String,
        customerReference: String
    });
    var Shipment = mongoose.model('Shipment', shipmentSchema);*/
    console.log('Connected!');
});

/**********************************************************************/
app.engine('hbs', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'hbs');

app.use(express.static('public'));
app.use(express.static('bower_components'));

fs.readFile('./Shipping_History.csv', 'utf-8', function(err, data) {
    'use strict';
    if (err) {throw err;}
    csv.parse(data, {columns: true}, function(err, shipmentsArray){
//        console.log(shipmentsArray);
    });
});

/*var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('App listening at http://localhost:%s', port);
});*/