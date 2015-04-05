var express = require('express');
var app = express();

// Database
var tungus = require('tungus');
var mongoose = require('mongoose');

mongoose.connect('tingodb://'+__dirname+'/db', function (err) {
  // if we failed to connect, abort
  if (err) throw err;

  var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

  });
  
});

app.get('/', require('./controllers/indexController'));