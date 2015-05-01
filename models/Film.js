var kinopoisk = require('kinopoisk-ru');

module.exports = {

	identity: 'film',

	connection: 'myLocalDisk',

	schema: true,

	migrate: 'alter',

	attributes: {
		id: {
			type: 'integer',
			unique: 'true'
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

			next();
		});
	}

};