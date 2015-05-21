var express = require('express');

var INDEX_PATH = '/';
// var LIST_PATH = ???
var CREATE_PATH = '/';
var READ_PATH = '/:id/';
var UPDATE_PATH = '/:id/update';
var DELETE_PATH = '/:id/delete';

function Controller(controllerDeclaration) {
	this.router = express.Router();

	this.defineCRUDroutes(controllerDeclaration);
}

Controller.prototype.defineCRUDroutes = function (controllerDeclaration) {
	this.router.use(controllerDeclaration.before);

	this.router.get('/', controllerDeclaration.index);
};

Controller.prototype.render = function () {

};

Controller.prototype.retpath = function () {

};