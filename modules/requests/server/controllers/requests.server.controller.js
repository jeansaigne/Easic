'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	path = require('path'),
	mongoose = require('mongoose'),
	Request = mongoose.model('Request'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
	adapters = require(path.resolve('./modules/requests/server/controllers/api-adapters.server.controller')),
    async = require('async');

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
		req.request = request;
		next();
	});
};

exports.getMedias = function(req, res) {
	if (req.body.q) {

		// Array to hold async tasks
        var asyncTasks = [];
        // Array index adapters async tasks
		var asyncTasksTable = {
            youtube     : adapters.youtubeApi,
            soundcloud  : adapters.soundcloudApi,
            vimeo       : adapters.vimeoApi,
            deezer      : adapters.deezerApi,
            spotify     : adapters.spotifyApi
        };
        //console.log(asyncTasksTable);
        // Filter adapters if sources are set
        if (req.body.sources) {
            for (var source in req.body.sources) {
                asyncTasks.push(asyncTasksTable[source].bind(null, req.body));
            }
            //console.log(asyncTasks);
        } else {
            //Use every adapters if no source set
            for (var adapter in asyncTasksTable) {
                asyncTasks.push(asyncTasksTable[adapter].bind(null, req.body));
            }
        }
		// Now we have an array of functions doing async tasks
		// Execute all async tasks in the asyncTasks array
		async.parallelLimit(asyncTasks, 3, function (err, results) {
			// All tasks are done now
			if (err)
                res.jsonp(err);
            else
                res.jsonp(results);
		});
	} else
		res.jsonp({message: 'Error: q parameter is needed.'});
};


