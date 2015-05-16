var express = require('express');

var controller = express();
var Film = require('../modules/orm').collections.film;
var Watchlist = require('../modules/orm').collections.watchlist;

controller.set('views', __dirname + '/../pages');
controller.use(dataSetup);

/**
 * Controller routs
 */

controller
	.get('/', getList, render('index'));

/**
 * Middleware methods
 */

function dataSetup(req, res, next) {
	res.locals.page = 'Films';
	req.state = {};
	next();
}

function getList(req, res, next) {
	Film.find(function (err, films) {
		if (err) {
			return next(err);
		}

		res.locals.film = films;

		if (!req.session.user) {
			return next();
		}

		// TODO: middleware loadResource('watchlist')
		// resources destiontaion ./resources/
		// put films & options for resource in state ?

		var filmIds = films.map(function (film, index) {
			return film.id;
		});

		var query = {
			user: req.session.user.id,
			film: filmIds
		};

		Watchlist.find(query, function (err, watchlist) {
			if (err) {
				return next(err);
			}

			res.locals.watchlist = watchlist;
			next();
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

module.exports = controller;