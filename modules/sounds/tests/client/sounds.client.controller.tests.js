'use strict';

(function() {
	// Sounds Controller Spec
	describe('Sounds Controller Tests', function() {
		// Initialize global variables
		var SoundsController,
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

			// Initialize the Sounds controller.
			SoundsController = $controller('SoundsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Sound object fetched from XHR', inject(function(Sounds) {
			// Create sample Sound using the Sounds service
			var sampleSound = new Sounds({
				name: 'New Sound'
			});

			// Create a sample Sounds array that includes the new Sound
			var sampleSounds = [sampleSound];

			// Set GET response
			$httpBackend.expectGET('api/sounds').respond(sampleSounds);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.sounds).toEqualData(sampleSounds);
		}));

		it('$scope.findOne() should create an array with one Sound object fetched from XHR using a soundId URL parameter', inject(function(Sounds) {
			// Define a sample Sound object
			var sampleSound = new Sounds({
				name: 'New Sound'
			});

			// Set the URL parameter
			$stateParams.soundId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/api\/sounds\/([0-9a-fA-F]{24})$/).respond(sampleSound);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.sound).toEqualData(sampleSound);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Sounds) {
			// Create a sample Sound object
			var sampleSoundPostData = new Sounds({
				name: 'New Sound'
			});

			// Create a sample Sound response
			var sampleSoundResponse = new Sounds({
				_id: '525cf20451979dea2c000001',
				name: 'New Sound'
			});

			// Fixture mock form input values
			scope.name = 'New Sound';

			// Set POST response
			$httpBackend.expectPOST('api/sounds', sampleSoundPostData).respond(sampleSoundResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Sound was created
			expect($location.path()).toBe('/sounds/' + sampleSoundResponse._id);
		}));

		it('$scope.update() should update a valid Sound', inject(function(Sounds) {
			// Define a sample Sound put data
			var sampleSoundPutData = new Sounds({
				_id: '525cf20451979dea2c000001',
				name: 'New Sound'
			});

			// Mock Sound in scope
			scope.sound = sampleSoundPutData;

			// Set PUT response
			$httpBackend.expectPUT(/api\/sounds\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/sounds/' + sampleSoundPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid soundId and remove the Sound from the scope', inject(function(Sounds) {
			// Create new Sound object
			var sampleSound = new Sounds({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Sounds array and include the Sound
			scope.sounds = [sampleSound];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/api\/sounds\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleSound);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.sounds.length).toBe(0);
		}));
	});
}());