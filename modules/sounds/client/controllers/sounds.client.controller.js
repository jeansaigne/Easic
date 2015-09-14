'use strict';

// Sounds controller
angular.module('sounds').controller('SoundsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Sounds',
	function($scope, $stateParams, $location, Authentication, Sounds ) {
		$scope.authentication = Authentication;

		// Create new Sound
		$scope.create = function() {
			// Create new Sound object
			var sound = new Sounds ({
				name: this.name
			});

			// Redirect after save
			sound.$save(function(response) {
				$location.path('sounds/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Sound
		$scope.remove = function( sound ) {
			if ( sound ) { sound.$remove();

				for (var i in $scope.sounds ) {
					if ($scope.sounds [i] === sound ) {
						$scope.sounds.splice(i, 1);
					}
				}
			} else {
				$scope.sound.$remove(function() {
					$location.path('sounds');
				});
			}
		};

		// Update existing Sound
		$scope.update = function() {
			var sound = $scope.sound ;

			sound.$update(function() {
				$location.path('sounds/' + sound._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Sounds
		$scope.find = function() {
			$scope.sounds = Sounds.query();
		};

		// Find existing Sound
		$scope.findOne = function() {
			$scope.sound = Sounds.get({ 
				soundId: $stateParams.soundId
			});
		};
	}
]);