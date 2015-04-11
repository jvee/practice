var express = require('express');
var bodyParser = require('body-parser');
var controller = express();

var Film = require('../orm/').collections.film;

controller.set('views', __dirname + '/../pages');
controller.use(bodyParser.urlencoded({ extended: true }));

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

controller.get('/:film_id/edit', function (req, res) {
	Film.findOne(req.params.film_id, function (err, film) {
		if (err) {
			return res.redirect('/');
		}

		res.render('film-edit', {film: film});
	});
});

controller.post('/:film_id', function (req, res) {
	Film.update(req.body.film.id, req.body.film, function (err) {
		res.redirect('/film');
	});
});

module.exports = controller;