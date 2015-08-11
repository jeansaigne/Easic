'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	path = require('path'),
	mongoose = require('mongoose'),
	Request = mongoose.model('Request'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Request
 */
exports.create = function(req, res) {
	var request = new Request(req.body);
	request.user = req.user;

	request.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(request);
		}
	});
};

/**
 * Show the current Request
 */
exports.read = function(req, res) {
	res.jsonp(req.request);
};

/**
 * Update a Request
 */
exports.update = function(req, res) {
	var request = req.request ;

	request = _.extend(request , req.body);

	request.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(request);
		}
	});
};

/**
 * Delete an Request
 */
exports.delete = function(req, res) {
	var request = req.request ;

	request.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(request);
		}
	});
};

/**
 * List of Requests
 */
exports.list = function(req, res) { Request.find().sort('-created').populate('user', 'displayName').exec(function(err, requests) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(requests);
		}
	});
};

/**
 * Request middleware
 */
exports.requestByID = function(req, res, next, id) { Request.findById(id).populate('user', 'displayName').exec(function(err, request) {
		if (err) return next(err);
		if (! request) return next(new Error('Failed to load Request ' + id));
		req.request = request ;
		next();
	});
};

function getYoutubeMedias() {

	return 'ok';
}

exports.getMedias = function(req, res) {
	res.jsonp(getYoutubeMedias());
};


