'use strict';

module.exports = function(app) {
	var sounds = require('../controllers/sounds.server.controller');
	var soundsPolicy = require('../policies/sounds.server.policy');

	// Sounds Routes
	app.route('/api/sounds').all()
		.get(sounds.list).all(soundsPolicy.isAllowed)
		.post(sounds.create);

	app.route('/api/sounds/:soundId').all(soundsPolicy.isAllowed)
		.get(sounds.read)
		.put(sounds.update)
		.delete(sounds.delete);

	// Finish by binding the Sound middleware
	app.param('soundId', sounds.soundByID);
};