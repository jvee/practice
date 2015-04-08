var path = require('path');
var fs = require('fs');

var Waterline = require('waterline');
var ormConfig = require('./config');

var orm = new Waterline();
var MODELS_DIR = '../models/';
var modelNames = fs.readdirSync(path.join( __dirname, MODELS_DIR));

modelNames.forEach(function (modelName, index) {
	var modelDefinition = require(MODELS_DIR + modelName);
	var model = Waterline.Collection.extend(modelDefinition);

	orm.loadCollection(model);
});

orm.init = orm.initialize.bind(orm, ormConfig);

module.exports = orm;