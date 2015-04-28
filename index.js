var express = require('express');
var session = require('express-session');
var SessionFileStore = require('session-file-store')(session);
var orm = require('./orm/');
var bodyParser = require('body-parser');
var retpath = require('./modules/retpath');

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
  saveUninitialized: true,
  store: new SessionFileStore({
    path: './db/sessions',
    ttl: 60 * 60 * 24
  })
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(retpath);

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

app.use(function (req, res, next) {
  res.locals.user = req.session.user;
  next();
});

app.get('/', require('./controllers/indexController').get);

app.use('/film', require('./controllers/filmController'));
app.use('/films', require('./controllers/filmsController'));

app.use('/auth', require('./controllers/authController'));