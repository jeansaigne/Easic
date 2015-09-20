'use strict';

//Playlists service used to communicate Playlists REST endpoints
angular.module('playlists').factory('Playlists', ['$resource',
	function($resource) {
		return $resource('api/playlists/:playlistId', { playlistId: '@_id'
		}, {
			update: {
				method: 'PUT'
			},
			get : {
				method : 'GET', isArray : true
			}
		});
	}
]);
