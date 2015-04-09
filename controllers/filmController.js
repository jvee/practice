var Film = require('../orm/').collections.film;

module.exports.list = function (req, res) {
	Film.find(function (err, films) {
		if (err) {
			return res.render('index', {page: 'film'});
		}

		res.render('index', {page: 'film', film: films});
	});
};

module.exports.get = function (req, res) {
	var id = req.params.film_id;

	Film.findOne(id, function (err, film) {
		if (err) {
			return res.render('index', {page: 'film'});
		}

		res.render('index', {page: 'film', film: film});
	});
};

