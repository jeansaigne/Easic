'use strict';

// Configuring the Sounds module
angular.module('sounds').run(['Menus',
	function(Menus) {
		// Add the Sounds dropdown item
		Menus.addMenuItem('topbar', {
			title: 'Sounds',
			state: 'sounds',
			type: 'dropdown'
		});

		// Add the dropdown list item
		Menus.addSubMenuItem('topbar', 'sounds', {
			title: 'List Sounds',
			state: 'sounds.list'
		});

		// Add the dropdown create item
		Menus.addSubMenuItem('topbar', 'sounds', {
			title: 'Create Sound',
			state: 'sounds.create'
		});
	}
]);