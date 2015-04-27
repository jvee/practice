var express = require('express');
var bodyParser = require('body-parser');

var controller = express();
var User = require('../orm/').collections.user;

controller.set('views', __dirname + '/../pages');
controller.use(bodyParser.urlencoded({ extended: true }));

/**
 * Controller routs
 */

controller
	.all('/login', loginDataSetup)
	.get('/login', loginRestrict, render('login'))
	.post('/login', loginCheck)
	.post('/logout', logout)
	.all('/signup', signupDataSetup)
	.get('/signup', loginRestrict, render('signup'))
	.post('/signup', loginRestrict, signup);

/**
 * Middleware methods
 */

function loginDataSetup(req, res, next) {
	// TODO: mb move "retpath" to middleware & keep it in session
	var retpath = req.body.retpath ? req.body.retpath : req.headers.referer;

	res.locals.page = 'Login';
	res.locals.form = {};
	res.locals.form.retpath = retpath;
	next();
}

function loginRestrict(req, res, next) {
	if (req.session.user) {
		return res.redirect('/');
	}

	next();
}

function loginCheck(req, res, next) {
	var formData = req.body;

	res.locals.form.login = formData.login;
	res.locals.form.password = formData.password;

	User.check(formData, function (err, user) {
		if (err) {
			// TODO: move to constans texts
			if (typeof err === 'string') {
				res.locals.form.message = 'Wrong Login or Password';
			} else {
				next(err);
			}
			return res.render('login');
		}

		req.session.regenerate(function () {
			console.log('[Auth]: logined user %s', user.login);
			req.session.user = user;
			res.redirect(req.body.retpath || '/');
		});
	});
}

function logout(req, res, next) {
	req.session.destroy(function (err) {
		if (err) {
			next(err);
		}

		// TODO: '/' to constants
		res.redirect(req.headers.referer || '/');
	});
}

function signupDataSetup(req, res, next) {
	var retpath = req.body.retpath ? req.body.retpath : req.headers.referer;

	res.locals.page = 'Signup';
	res.locals.form = {};
	res.locals.form.retpath = retpath;

	next();
}

function signup(req, res, next) {
	var formData = req.body;

	res.locals.form.login = formData.login;
	res.locals.form.password = formData.password;

	User.create(formData, function (err, user) {
		if (err) {
			// TODO: normalize error list
			res.locals.form.message = err.invalidAttributes;
			return res.render('signup');
		}

		req.session.regenerate(function () {
			console.log('[Auth]: logined user %s', user.login);
			req.session.user = user;
			res.redirect(req.body.retpath || '/');
		});
	});
}

/**
 * Middleware helpers
 */

function render(template) {
	return function (req, res) {
		res.render(template);
	};
}

function redirect(path) {
	return function (req, res) {
		res.redirect(path);
	};
}

module.exports = controller;