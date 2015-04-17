var express = require('express');
var bodyParser = require('body-parser');

var controller = express();
var User = require('../orm/').collections.user;

controller.set('views', __dirname + '/../pages');
controller.use(bodyParser.urlencoded({ extended: true }));

controller.get('/login', function (req, res) {
	// if req.session.user redirect
	// TODO: вынести в dataSetup
	res.locals.page = 'Login';

	res.render('login');
});

controller.post('/login', function (req, res) {
	// TODO: вынести в dataSetup
	res.locals.page = 'Login';

	var formData = req.body;

	User.check(formData, function (err, user) {
		if (err) {
			// TODO: crate validation
			console.log(err);
			res.render('login');
		}

		req.session.regenerate(function () {
			console.log('[Auth]: logined user %s', user.login);
			req.session.user = user;
			res.redirect('/');
		});

	});
});

controller.post('/logout', function (req, res) {
	// req.session.destroy(function () {
	// 	res.redirect('/');
	// });
});

controller.get('/signup', function (req, res) {
	// res.render('signup');
});

controller.post('/signup', function (req, res) {
	// var formData = req.body.user;

	// User.findOne({ login: formData.login }, function (err, user) {
	// 	if (err) {
	// 		return next(err);
	// 	}

	// 	if (user) {
	// 		return next('Login already exists');
	// 	}

	// 	User.create(formData, function (err, user) {
	// 		res.redirect('/');
	// 	});
	// });
});

module.exports = controller;