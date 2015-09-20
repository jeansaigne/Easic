'use strict';

(function() {
	// Playlists Controller Spec
	describe('Playlists Controller Tests', function() {
		// Initialize global variables
		var PlaylistsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Playlists controller.
			PlaylistsController = $controller('PlaylistsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Playlist object fetched from XHR', inject(function(Playlists) {
			// Create sample Playlist using the Playlists service
			var samplePlaylist = new Playlists({
				name: 'New Playlist'
			});

			// Create a sample Playlists array that includes the new Playlist
			var samplePlaylists = [samplePlaylist];

			// Set GET response
			$httpBackend.expectGET('api/playlists').respond(samplePlaylists);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.playlists).toEqualData(samplePlaylists);
		}));

		it('$scope.findOne() should create an array with one Playlist object fetched from XHR using a playlistId URL parameter', inject(function(Playlists) {
			// Define a sample Playlist object
			var samplePlaylist = new Playlists({
				name: 'New Playlist'
			});

			// Set the URL parameter
			$stateParams.playlistId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/api\/playlists\/([0-9a-fA-F]{24})$/).respond(samplePlaylist);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.playlist).toEqualData(samplePlaylist);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Playlists) {
			// Create a sample Playlist object
			var samplePlaylistPostData = new Playlists({
				name: 'New Playlist'
			});

			// Create a sample Playlist response
			var samplePlaylistResponse = new Playlists({
				_id: '525cf20451979dea2c000001',
				name: 'New Playlist'
			});

			// Fixture mock form input values
			scope.name = 'New Playlist';

			// Set POST response
			$httpBackend.expectPOST('api/playlists', samplePlaylistPostData).respond(samplePlaylistResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Playlist was created
			expect($location.path()).toBe('/playlists/' + samplePlaylistResponse._id);
		}));

		it('$scope.update() should update a valid Playlist', inject(function(Playlists) {
			// Define a sample Playlist put data
			var samplePlaylistPutData = new Playlists({
				_id: '525cf20451979dea2c000001',
				name: 'New Playlist'
			});

			// Mock Playlist in scope
			scope.playlist = samplePlaylistPutData;

			// Set PUT response
			$httpBackend.expectPUT(/api\/playlists\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/playlists/' + samplePlaylistPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid playlistId and remove the Playlist from the scope', inject(function(Playlists) {
			// Create new Playlist object
			var samplePlaylist = new Playlists({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Playlists array and include the Playlist
			scope.playlists = [samplePlaylist];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/api\/playlists\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(samplePlaylist);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.playlists.length).toBe(0);
		}));
	});
}());