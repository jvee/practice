var express = require('express');
var controller = express();

var Film = require('../orm/').collections.film;

controller.set('views', __dirname + '/../pages');

controller.use(function (req, res, next) {
	res.locals.page = 'Film';
	next();
});

controller.get('/', function (req, res) {
	Film.find(function (err, films) {
		if (err) {
			return res.render('index');
		}

		res.render('index', {film: films});
	});
});

controller.get('/:film_id', function (req, res) {
	var id = req.params.film_id;

	Film.findOne(id, function (err, film) {
		if (err) {
			return res.render('index');
		}

		res.render('index', {film: film});
	});
});

controller.post('/:film_id/delete', function (req, res) {
	Film.destroy(req.params.film_id, function (err) {
		res.redirect('/film');
	});
});

module.exports = controller;