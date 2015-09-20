'use strict';

//Setting up route
angular.module('playlists').config(['$stateProvider',
	function($stateProvider) {
		// Playlists state routing
		$stateProvider.
		state('playlists', {
			abstract: true,
			url: '/playlists',
			template: '<ui-view/>'
		}).
		state('playlists.list', {
			url: '',
			templateUrl: 'modules/playlists/views/list-playlists.client.view.html'
		}).
		state('playlists.create', {
			url: '/create',
			templateUrl: 'modules/playlists/views/create-playlist.client.view.html'
		}).
		state('playlists.view', {
			url: '/:playlistId',
			templateUrl: 'modules/playlists/views/view-playlist.client.view.html'
		}).
		state('playlists.edit', {
			url: '/:playlistId/edit',
			templateUrl: 'modules/playlists/views/edit-playlist.client.view.html'
		});
	}
]);