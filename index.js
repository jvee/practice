var express = require('express');
var orm = require('./orm/');

var app = express();

app.engine('yate', function (filePath, options, callback) {
  var yate = require('yate');
  var render;

  try {
    render = yate.run(filePath, null, { data: options });
    callback(null, render);
  } catch (err) {
    callback(err);
  }
});

app.set('views', './pages');
app.set('view engine', 'yate');

orm.init(function (err, orm) {
  if (err) throw err;

  var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

  });
  
});

app.get('/', require('./controllers/indexController').get);

app.get('/film', require('./controllers/filmController').list);
app.get('/film/:film_id', require('./controllers/filmController').get);
app.post('/film/:film_id/delete', require('./controllers/filmController').delete);