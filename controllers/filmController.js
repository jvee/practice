var express = require('express');
var bodyParser = require('body-parser');
var controller = express();

var Film = require('../orm/').collections.film;

controller.set('views', __dirname + '/../pages');
controller.use(bodyParser.urlencoded({ extended: true }));

controller.use(dataSetup);
controller.param('film_id', getItem);

/**
 * Controller routs
 */

controller
	.get('/', redirect('/films'))
	.get('/:film_id', render('index'))
	.get('/:film_id/edit', render('film-edit'))
	.post('/:film_id/delete', deleteItem, redirect('/films'))
	.post('/:film_id', updateItem, redirect('/films'));

/**
 * Middleware methods
 */

function dataSetup(req, res, next) {
	res.locals.page = 'Film';
	req.state = {};
	next();
}

function getItem(req, res, next, id) {
	Film.findOne(id, function (err, film) {
		if (err) {
			return next(err);
		}

		if (!film) {
			return next('Film ' + id + ' not found');
		}

		req.state.film = res.locals.film = film;
		next();
	});
}

function deleteItem(req, res, next) {
	req.state.film.destroy(next);
}

function updateItem(req, res, next) {
	var formData = req.body.film;
	var film = req.state.film;

	Object.keys(formData).forEach(function (key, index) {
		film[key] = formData[key];
	});

	film.save(next);
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