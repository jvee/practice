var express = require('express');
var session = require('express-session');
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

app.use(session({
  // TODO: move to config (all session options)
  secret: 'mistery',
  resave: true,
  saveUninitialized: true
}));

orm.init(function (err, orm) {
  if (err) throw err;

  var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

    // TODO: remove or setup super user over config
    orm.collections.user.new({
      login: 'admin',
      password: ''
    }, function () {
      console.log('[SuperUser]: inited');
    });

  });
  
});

app.get('/', require('./controllers/indexController').get);

app.use('/film', require('./controllers/filmController'));
app.use('/films', require('./controllers/filmsController'));

app.use('/auth', require('./controllers/authController'));