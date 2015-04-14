var express = require('express');

var controller = express();
var User = require('../orm/').collections.user;

controller.set('views', __dirname + '/../pages');

controller.get('/login', function (req, res) {
	// if req.session.user redirect
	
	// res.render('login');
});

controller.post('/login', function (req, res, next) {

	// var formData = req.body.user

	// TODO: User.check(formData, function () {});
	// User.findOne({ login: formData.login }, function (err, user) {
	// 	if (err) {
	// 		return next(err);
	// 	}

	// 	if (!user) {
	// 		return next('User not exists');
	// 	}

	// 	if (user.password !== formData.password) {
	// 		return next('Wrong password');
	// 	}

	// 	req.session.regenerate(function(){
	// 		req.session.user = user;
	// 		res.redirect('/');
	// 	});
	// });

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