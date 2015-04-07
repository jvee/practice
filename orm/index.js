var Waterline = require('waterline');
var ormConfig = require('./config');

var orm = new Waterline();

orm.loadCollection(require('../models/Film'));

orm.init = orm.initialize.bind(orm, ormConfig);

module.exports = orm;