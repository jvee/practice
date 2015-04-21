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
	res.locals.form = {};

	res.render('login');
});

controller.post('/login', function (req, res) {
	// TODO: вынести в dataSetup
	res.locals.page = 'Login';

	var formData = req.body;

	res.locals.form = {
		login: formData.login,
		password: formData.password
	};

	User.check(formData, function (err, user) {
		if (err) {
			// TODO: move to constans texts
			if (typeof err === 'string') {
				res.locals.form.message = 'Wrong Login or Password';
			} else {
				res.locals.form.message = 'Somthing goes wrong';
			}
			return res.render('login');
		}

		req.session.regenerate(function () {
			console.log('[Auth]: logined user %s', user.login);
			req.session.user = user;
			res.redirect('/');
		});

	});
});

// TODO: оставить только POST для logout
controller.all('/logout', function (req, res) {
	req.session.destroy(function (err) {
		// TODO: chek err
		res.redirect('/');
	});
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