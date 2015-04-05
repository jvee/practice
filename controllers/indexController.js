var yate = require('yate');

module.exports = function (req, res) {
	var data = {data: {page: 'index'}};
	var template = './pages/index.yate';
	var renderResult = yate.run(template, null, data);

	res.send(renderResult);
};