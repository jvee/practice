var kinopoisk = require('kinopoisk-ru');

module.exports = {

	identity: 'film',

	connection: 'myLocalDisk',

	schema: true,

	migrate: 'alter',

	attributes: {
		id: {
			type: 'integer',
			unique: 'true',
			primaryKey: true
		},
		title: 'string',
		rating: 'float',
		poster: 'string'
	},

	beforeCreate: function (data, next) {
		kinopoisk.getById(data.id, null, function (error, filmData) {
			if (error) {
				return next(error);
			}

			Object.keys(filmData).forEach(function (key) {
				data[key] = filmData[key];
			});

			// setting up additional properties
			// TODO: move to kinopoisk.api.js
			data.poster = '//www.kinopoisk.ru/images/film_big/' + data.id + '.jpg';

			next();
		});
	}

};