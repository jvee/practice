var Film = require('../orm/').collections.film;

module.exports = function (req, res) {
	var data = {page: 'index'};
	var id = req.query.id;

	if (!id) {
		return res.render('index', data);
	}

	Film.findOrCreate({id: id}, {id:id}, function (error, result) {
		if (error) {
			return res.render('index', data);
		}

		data.film = result;

		res.render('index', data);
	});
};