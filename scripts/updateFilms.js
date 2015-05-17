var orm = require('../modules/orm');
var kinopoisk = require('kinopoisk-ru');

var filmsQueue;
var filmsQueueInitialLengh;
var notFoundRE = /Film with id \d{3,10} not found/;

var options = {
	timeout: 1000,
	posterUrlTemplate: 'http://www.kinopoisk.ru/images/film_big/{id}.jpg'
};

// TODO: films ids via script arguments
// TODO: timeout via script arguments
// TODO: film.update instance method
// TODO: log error in then end ?
// TODO: export films (ids) script
// TODO: export watchlist (with user id via arguments)
// TODO: import with stategies (merge | clean)

orm.init(function (err, orm) {
	var Film = orm.collections.film;

	Film.find(function (err, films) {
		filmsQueue = films;
		filmsQueueInitialLengh = films.length;
		update();
	});
});

function update() {
	var film = filmsQueue.shift();
	var progress;

	if (!film) {
		console.log('[Updating]: Done');
		return;
	}

	progress = ((1 - (filmsQueue.length + 1) / filmsQueueInitialLengh) * 100).toFixed(2);

	console.log('[Updating]: %s (%d%)', film.title, progress);

	kinopoisk.getById(film.id, null, function (err, filmData) {
		if (err) {
			if (err.message.match(notFoundRE)) {
				console.warn('[Updating]: Error, %s', err.message);
				return setTimeout(update, options.timeout);
			}

			throw err;
		}

		Object.keys(filmData).forEach(function (key) {
			film[key] = filmData[key];
		});

		film.poster = options.posterUrlTemplate.replace('{id}', film.id);

		if (!film.rating) {
			delete film.rating;
		}

		film.save(function (err, film) {
			if (err) {
				throw err;
			}

			setTimeout(update, options.timeout);
		});
	});
}