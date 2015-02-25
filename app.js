var express = require('express'),
    exphbs = require('express-handlebars'),
    app = express();

app.engine('hbs', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'hbs');

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.render('home');
});

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://localhost:%s', port)
});