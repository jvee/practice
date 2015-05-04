var express = require('express');

var controller = express();

var User = require('../orm').collections.user;
var Film = require('../orm').collections.film;
var Watchlist = require('../orm').collections.watchlist;

controller.set('views', __dirname + '/../pages');

/**
 * Controller routs
 */

controller
	// .all()
	.get('/', index)
	// TODO: loginRestrict
	.post('/', create);

/**
 * Middleware methods
 */

function index(req, res, next) {

	// TODO xhr or application/json check
	// otherwise next() to render

	var query = {
		user: req.session.user.id
	};

	Watchlist.find(query, function (err, watchlist) {
		if (err) {
			return next(err);
		}

		res.locals.watchlist = watchlist;

		var filmIds = watchlist.map(function (item, index) {
			return item.film;
		});

		Film.find(filmIds, function (err, films) {
			if (err) {
				return next(err);
			}

			res.locals.film = films;

			res.json(res.locals);
		});
	});
}

function create(req, res, next) {
	var user = req.session.user;
	var filmId = req.body.filmId;
	// TODO: string check
	var watched = !!req.body.watched;

	var data = {
		film: filmId,
		user: user.id,
		watched: watched
	};

	Watchlist.saveItem(data, function (err, watchlistItem) {
		if (err) {
			return next(err);
		}

		// TODO: this.retpath() for feature controller
		res.redirect(req.state.retpath || '/');
	});
}

module.exports = controller;