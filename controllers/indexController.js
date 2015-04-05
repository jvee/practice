var yate = require('yate');
var kinopoisk = require('node-kinopoisk-ru');

module.exports = function (req, res) {
	var data = {data: {page: 'index'}};
	var template = './pages/index.yate';
	var renderResult;
	
	var id = req.query.id;

	if (!id) {
		renderResult = yate.run(template, null, data);
		return res.send(renderResult);
	}

	kinopoisk.getById(id, null, function (error, result) {
		if (error) {
			renderResult = yate.run(template, null, data);
			return res.send(renderResult);
		}

		data.data.film = result;

		renderResult = yate.run(template, null, data);
		res.send(renderResult);
	});
};