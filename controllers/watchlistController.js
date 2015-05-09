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
	.get('/', before, index, render('watchlist'))
	// TODO: loginRestrict
	.post('/', before, create)
	.post('/delete', destroy);

/**
 * Middleware methods
 */

function before(req, res, next) {
	res.locals.page = 'Watchlist';
	next();
}

function index(req, res, next) {
	var query = {
		where: {
			user: req.session.user.id
		},
		sort: 'updatedAt DESC'
	};

	Watchlist.find(query, function (err, watchlist) {
		if (err) {
			return next(err);
		}

		var filmIds = watchlist.map(function (item, index) {
			return item.film;
		});

		Film.find(filmIds, function (err, films) {
			if (err) {
				return next(err);
			}

			res.locals.watchlist = watchlist;
			res.locals.film = films;

			// TODO xhr or application/json check
			// otherwise next() to render
			// res.json(res.locals);

			next();
		});
	});
}

function create(req, res, next) {
	var user = req.session.user;
	var filmId = req.body.filmId;
	var watched = !!parseInt(req.body.watched, 10);

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

function destroy(req, res, next) {
	var query = {
		user: req.session.user.id,
		film: req.body.filmId
	};

	Watchlist.removeItem(query, function (err, watchlistItem) {
		if (err) {
			return next(err);
		}

		// TODO: don't forgen about 'back' redirect
		res.redirect(req.state.retpath || '/');
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