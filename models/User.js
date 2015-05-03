module.exports = {

	identity: 'user',

	connection: 'myLocalDisk',

	schema: true,

	migrate: 'alter',

	attributes: {
		login: {
			type: 'string',
			unique: 'true'
		},
		password: 'string',
		watchlist: {
			collection: 'watchlist',
			via: 'user'
		}
	},

	new: function (userData, callback) {
		var User = this;

		User.findOne({login: userData.login}, function (err, user) {
			if (err) {
				return callback(err);
			}

			if (user) {
				return callback('User already exists');
			}

			User.create(userData, callback);
		});
	},

	check: function (userData, callback) {
		var User = this;

		User.findOne({login: userData.login}, function (err, user) {
			if (err) {
				return callback(err);
			}

			if (!user) {
				return callback('User not found');
			}

			if (user.password !== userData.password) {
				return callback('Wrong password');
			}

			callback(null, user);
		});
	}

};