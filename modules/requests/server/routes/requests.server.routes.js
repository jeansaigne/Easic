'use strict';

module.exports = function(app) {
	var requests = require('../controllers/requests.server.controller');
	var requestsPolicy = require('../policies/requests.server.policy');

	// Requests Routes
	app.route('/api/requests').all()
		.get(requests.list).all(requestsPolicy.isAllowed)
		.post(requests.create);

	app.route('/api/requests/:requestId').all(requestsPolicy.isAllowed)
		.get(requests.read)
		.put(requests.update)
		.delete(requests.delete);

	app.route('/api/getMedias').all()
		.post(requests.getMedias)
		.get(requests.autocomplete);

	// Finish by binding the Request middleware
	app.param('requestId', requests.requestByID);
};
