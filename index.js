var express = require('express');
var app = express();

//console.log(app);

app.get('/', function(req, res) {
    res.send("We're up!");
});

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://localhost:%s', port)
});