'use strict';

//Requests service used to communicate Requests REST endpoints
angular.module('core').factory('Search', ['$resource',
	function($resource) {
		return $resource('api/getMedias', {
			query: '@_query',
		}, {
			query: {
				method: 'POST', isArray: true
			}
		});
	}
]).factory('Requests', ['$resource',
	function($resource) {
		return $resource('api/requests/:requestId', { requestId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
