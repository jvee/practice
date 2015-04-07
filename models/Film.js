var Waterline = require('waterline');
var kinopoisk = require('node-kinopoisk-ru');

var Film = Waterline.Collection.extend({

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

});

module.exports = Film;