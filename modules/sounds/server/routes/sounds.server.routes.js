'use strict';

module.exports = function(app) {
	var sounds = require('../controllers/sounds.server.controller');
	var soundsPolicy = require('../policies/sounds.server.policy');

	// Sounds Routes
	app.route('/api/sounds').all()
		.get(sounds.list).all(soundsPolicy.isAllowed)
		.post(sounds.create);

	// Finish by binding the Sound middleware
	app.param('soundId', sounds.soundByID);
};
