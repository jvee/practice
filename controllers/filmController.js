var express = require('express');
var bodyParser = require('body-parser');
var controller = express();

var Film = require('../orm/').collections.film;

controller.set('views', __dirname + '/../pages');
controller.use(bodyParser.urlencoded({ extended: true }));

controller.use(dataSetup);

/**
 * Controller routs
 */

controller
	.get('/', getList, render('index'))
	.get('/:film_id', getItem, render('index'))
	.get('/:film_id/edit', getItem, render('film-edit'))
	.post('/:film_id/delete', deleteItem, redirect('/film'))
	.post('/:film_id', updateItem, redirect('/film'));

/**
 * Middleware methods
 */

function dataSetup(req, res, next) {
	res.locals.page = 'Film';
	next();
}

function getList(req, res, next) {
	Film.find(function (err, films) {
		if (err) {
			return;
		}

		res.locals.film = films;
		next();
	});
}

function getItem(req, res, next) {
	var id = req.params.film_id;

	Film.findOne(id, function (err, film) {
		if (err) {
			return;
		}

		res.locals.film = film;
		next();
	});
}

function deleteItem(req, res, next) {
	Film.destroy(req.params.film_id, function (err) {
		if (err) {
			return;
		}

		next();
	});
}

function updateItem(req, res, next) {
	Film.update(req.body.film.id, req.body.film, function (err) {
		if (err) {
			return;
		}

		next();
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