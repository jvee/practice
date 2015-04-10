var Film = require('../orm/').collections.film;

module.exports.before = function (req, res, next) {
	res.locals.page = 'film';
	next();
};

module.exports.list = function (req, res) {
	Film.find(function (err, films) {
		if (err) {
			return res.render('index');
		}

		res.render('index', {film: films});
	});
};

module.exports.get = function (req, res) {
	var id = req.params.film_id;

	Film.findOne(id, function (err, film) {
		if (err) {
			return res.render('index');
		}

		res.render('index', {film: film});
	});
};

module.exports.delete = function (req, res) {
	Film.destroy(req.params.film_id, function (err) {
		res.redirect('/film');
	});
};

