'use strict';

//Setting up route
angular.module('sounds').config(['$stateProvider',
	function($stateProvider) {
		// Sounds state routing
		$stateProvider.
		state('sounds', {
			abstract: true,
			url: '/sounds',
			template: '<ui-view/>'
		}).
		state('sounds.list', {
			url: '',
			templateUrl: 'modules/sounds/views/list-sounds.client.view.html'
		}).
		state('sounds.create', {
			url: '/create',
			templateUrl: 'modules/sounds/views/create-sound.client.view.html'
		}).
		state('sounds.view', {
			url: '/:soundId',
			templateUrl: 'modules/sounds/views/view-sound.client.view.html'
		}).
		state('sounds.edit', {
			url: '/:soundId/edit',
			templateUrl: 'modules/sounds/views/edit-sound.client.view.html'
		});
	}
]);