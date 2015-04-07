var express = require('express');
var orm = require('./orm/');

var app = express();

orm.init(function (err, orm) {
  if (err) throw err;

  var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

  });
  
});

app.get('/', require('./controllers/indexController'));