var express = require('express');
var app = express();

// Variables

var hosts = [];
var gests = [];
var reserves = [];
var reservations = [];

app.get('/', function (req, res) {
   res.send('Hello World');
})

app.get('/angular', function (req, res) {
    res.sendfile('app/index.html');
 })

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at => localhost:", port);
})