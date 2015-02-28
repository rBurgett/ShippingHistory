/*global require, console*/

var express = require('express'),
    exphbs = require('express-handlebars'),
    mongoose = require('mongoose'),
    fs = require('fs'),
    os = require('os'),
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
    'use strict';
});

/*************************Express Server************************/
app.engine('hbs', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'hbs');

app.use(express.static('public'));
app.use(express.static('bower_components'));

app.get('/shipments', function(req, res) {
    'use strict';
    if (req.query.term) {
        var q = req.query.q || 20;
        Shipment.find().where(req.query.field).equals(new RegExp(req.query.term, 'i')).limit(q).exec(function(err, shipments) {
            if(err) {res.send(err);}
            res.send(shipments);
        });
    } else if(req.query.q) {
        Shipment.find().limit(req.query.q).exec(function(err, shipments) {
            if(err) {res.send(err);}
            res.send(shipments);
        });
    } else {
        Shipment.find(function(err, shipments) {
            if(err) {res.send(err);}
            res.send(shipments);
        });
    }
});

var server = app.listen(3000, function() {
    'use strict';
    var host = server.address().address;
    var port = server.address().port;
    console.log('App listening at http://localhost:%s', port);
});

/*Shipment.find().exec(function(err, shipments) {
    'use strict';
    _.each(shipments, function(shipment) {
        Shipment.remove({_id: shipment._id}, function(err) {
            if (err) {console.error(err);}
        });
    });
});*/

/*********************CSV File Reader*******************************/

var updateShipmentDB = function() {
    'use strict';
    fs.readFile('./Shipping_History.csv', 'utf-8', function(err, data) {
        if (err) {throw err;}
        csv.parse(data, {columns: true}, function(err, shipments){
            var afterImport = _.after(shipments.length, function() {

                var text = 'trackingNumber,shipDate,deliveryDate,recipientID,contactName,companyName,address1,address2,city,state,zip,phone,recEmail,recEmailS,recEmailT,recEmailE,recEmailD,otherEmail1,otherEmail1S,otherEmail1T,otherEmail1E,otherEmail1D,otherEmail2,otherEmail2S,otherEmail2T,otherEmail2E,otherEmail2D,weight,serviceType,l,w,h,declaredValue,netCost,poNumber,customerReference' + os.EOL;

                fs.writeFile('Shipping_History.csv', text, function (err) {
                    if (err) {throw err;}
                });

            });
            _.each(shipments, function(shipment) {
                var record = new Shipment(shipment);
                record.save(function(err) {
                    if(err) {console.log(err);}
                    else {
                        afterImport();
                    }
                });
            });
        });
    });
};
updateShipmentDB();