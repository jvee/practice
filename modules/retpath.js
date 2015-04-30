// TODO: mb move to ./middleware/ dir
// TODO: possible XSS
// TODO: mb move to requestSetup.js
module.exports = function (req, res, next) {
	var retpath = req.body.retpath || req.query.retpath || req.headers.referer;

	// TODO: mb move to module "state"
	req.state = {};

	req.state.retpath = res.locals.retpath = retpath;
	next();
};