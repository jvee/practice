var express = require('express');
var app = express();

var yate = require('yate');


app.get('/', function (req, res) {
  var data = {data: {page: 'index'}};
  var template = './pages/index.yate';
  var renderResult = yate.run(template, null, data);

  res.send(renderResult);
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});