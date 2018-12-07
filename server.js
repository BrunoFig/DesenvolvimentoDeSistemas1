var express = require('express');
var app = express();
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

// configuration
//=================
app.use('/dist', express.static(__dirname + '/app/dist'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/views', express.static(__dirname + '/app/views'));
app.use('/app', express.static(__dirname + '/app'));
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// Variables
//=================
var hosts = [
    {name: "República Dauhma", city: "São Carlos"},
    {name: "Apeor", city: "São Carlos"},
    {name: "República Caduca", city: "Campinas"}
];
var gests = [];
var reserves = [];
var reservations = [];
var cities = [
    {name: "São Paulo", id: 1},
    {name: "São Campinas", id: 3},
    {name: "São Carlos", id: 5}
];

// Routes
//=================
app.get('/backend/hosts', function(req, res) {
    res.json(hosts);
});
app.get('/backend/cities', function(req, res) {
    res.json(cities);
});
app.get('/', function (req, res) {
    res.sendfile('app/index.html');
 })

// Serve
//=================
var port = process.env.PORT|| 8080;
// listen (start app with node server.js)
app.listen(port);
console.log("App listening on port " + port);