var mongoose = require('mongoose');
var kinopoisk = require('node-kinopoisk-ru');

var Schema = mongoose.Schema;

var filmShema = Schema({
  id: Number,
  title: String,
  rating: Number
});

filmShema.set('autoIndex', false);

filmShema.statics.getById = function (id, callback) {
	if (!callback) {
		return;
	}

	if (!id) {
		callback(new Error('No ID'));
	}

	// TODO: check id type

	Film.findOne({id: id}, function (error, film) {
		if (error) {
			return callback(error);
		}

		if (film) {
			return callback(null, film);
		}

		kinopoisk.getById(id, null, function (error, filmData) {
			if (error) {
				return callback(error);
			}

			Film
				.create(filmData)
				.then(callback.bind(null, null), callback);
		});
	});

};

var Film = mongoose.model('Film', filmShema);

module.exports = Film;