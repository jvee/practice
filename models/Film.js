var Waterline = require('waterline');
var kinopoisk = require('node-kinopoisk-ru');

var Film = Waterline.Collection.extend({

	identity: 'Film',

	connection: 'myLocalDisk',

	schema: true,

	migrate: 'safe',

	attributes: {
		id: {
			type: 'integer',
			unique: 'true'
		},
		title: 'string',
		rating: 'float'
	},

	getById: function (id, callback) {
		var _this = this;

		if (!callback) {
			return;
		}

		if (!id) {
			callback(new Error('No ID'));
		}

		// TODO: check id type

		this.findOne({id: id}, function (error, film) {
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

				_this
					.create(filmData)
					.then(callback.bind(null, null), callback);
			});
		});

	}

});

module.exports = Film;