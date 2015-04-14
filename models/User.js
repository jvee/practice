var kinopoisk = require('node-kinopoisk-ru');

module.exports = {

	identity: 'user',

	connection: 'myLocalDisk',

	schema: true,

	migrate: 'alter',

	attributes: {
		login: 'string',
		password: 'float'
	}

};