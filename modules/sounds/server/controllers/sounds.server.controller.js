'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	path = require('path'),
	mongoose = require('mongoose'),
	Sound = mongoose.model('Sound'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Sound
 */
exports.create = function(req, res) {
	var sound = new Sound(req.body);
	sound.user = req.user;

	sound.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(sound);
		}
	});
};

/**
 * Show the current Sound
 */
exports.read = function(req, res) {
	res.jsonp(req.sound);
};

/**
 * Update a Sound
 */
exports.update = function(req, res) {
	var sound = req.sound ;

	sound = _.extend(sound , req.body);

	sound.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(sound);
		}
	});
};

/**
 * Delete an Sound
 */
exports.delete = function(req, res) {
	var sound = req.sound ;

	sound.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(sound);
		}
	});
};

/**
 * List of Sounds
 */
exports.list = function(req, res) { Sound.find().sort('-created').populate('user', 'displayName').exec(function(err, sounds) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(sounds);
		}
	});
};

/**
 * Sound middleware
 */
exports.soundByID = function(req, res, next, id) { Sound.findById(id).populate('user', 'displayName').exec(function(err, sound) {
		if (err) return next(err);
		if (! sound) return next(new Error('Failed to load Sound ' + id));
		req.sound = sound ;
		next();
	});
};