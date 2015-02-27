/*global require, console*/

var express = require('express'),
    exphbs = require('express-handlebars'),
    fs = require('fs'),
    csv = require('csv'),
    _ = require('lodash'),
    app = express();

app.engine('hbs', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'hbs');

app.use(express.static('public'));
app.use(express.static('bower_components'));

fs.readFile('./Shipping_History.csv', 'utf-8', function(err, data) {
    'use strict';
    if (err) {throw err;}
    csv.parse(data, {columns: true}, function(err, shipmentsArray){
        console.log(shipmentsArray);
    });
});

/*var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('App listening at http://localhost:%s', port);
});*/