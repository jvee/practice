module.exports = {

	identity: 'watchlist',

	connection: 'myLocalDisk',

	schema: true,

	migrate: 'alter',

	autoPK: false,

	attributes: {
		id: {
			type: 'integer',
			unique: true,
			primaryKey: true
		},
		user: {
			model: 'user',
			required: true
		},
		film: {
			model: 'film',
			required: true
		},
		watched: {
			type: 'boolean',
			defaultsTo: false
		}
		// TODO: tags
		// TODO: grade
		// TODO: comment
	},

	// TODO: remove id generation
	beforeCreate: function (data, next) {
		data.id = data.id || generateWatchlistId(data.user, data.film);
		next();
	},

	saveItem: function (data, callback) {
		var Watchlist = this;
		var query = {
			film: data.film,
			user: data.user
		};

		Watchlist.findOne(query, function (err, watchlistItem) {
			if (err) {
				return callback(err);
			}

			if (!watchlistItem) {
				return Watchlist.create(data, callback);
			}

			Object.keys(data).forEach(function (key, index) {
				watchlistItem[key] = data[key];
			});

			watchlistItem.save(callback);
		});
	},

	removeItem: function (data, callback) {
		var Watchlist = this;

		Watchlist.findOne(data, function (err, watchlistItem) {
			if (err) {
				return next(err);
			}

			watchlistItem.destroy(callback);
		});
	}

};

/**
 * Helpers
 */

function generateWatchlistId(userId, filmId) {
	return userId * 10000000 + filmId;
}