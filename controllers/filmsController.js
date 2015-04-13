var express = require('express');

var controller = express();
var Film = require('../orm/').collections.film;

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
			return;
		}

		res.locals.film = films;
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

module.exports = controller;