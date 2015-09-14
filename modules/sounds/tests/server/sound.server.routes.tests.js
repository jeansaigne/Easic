'use strict';

var should = require('should'),
	request = require('supertest'),
	path = require('path'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Sound = mongoose.model('Sound'),
	express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, sound;

/**
 * Sound routes tests
 */
describe('Sound CRUD tests', function() {
	before(function(done) {
		// Get application
		app = express.init(mongoose);
		agent = request.agent(app);

		done();
	});

	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Sound
		user.save(function() {
			sound = {
				name: 'Sound Name'
			};

			done();
		});
	});

	it('should be able to save Sound instance if logged in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Sound
				agent.post('/api/sounds')
					.send(sound)
					.expect(200)
					.end(function(soundSaveErr, soundSaveRes) {
						// Handle Sound save error
						if (soundSaveErr) done(soundSaveErr);

						// Get a list of Sounds
						agent.get('/api/sounds')
							.end(function(soundsGetErr, soundsGetRes) {
								// Handle Sound save error
								if (soundsGetErr) done(soundsGetErr);

								// Get Sounds list
								var sounds = soundsGetRes.body;

								// Set assertions
								(sounds[0].user._id).should.equal(userId);
								(sounds[0].name).should.match('Sound Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Sound instance if not logged in', function(done) {
		agent.post('/api/sounds')
			.send(sound)
			.expect(403)
			.end(function(soundSaveErr, soundSaveRes) {
				// Call the assertion callback
				done(soundSaveErr);
			});
	});

	it('should not be able to save Sound instance if no name is provided', function(done) {
		// Invalidate name field
		sound.name = '';

		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Sound
				agent.post('/api/sounds')
					.send(sound)
					.expect(400)
					.end(function(soundSaveErr, soundSaveRes) {
						// Set message assertion
						(soundSaveRes.body.message).should.match('Please fill Sound name');
						
						// Handle Sound save error
						done(soundSaveErr);
					});
			});
	});

	it('should be able to update Sound instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Sound
				agent.post('/api/sounds')
					.send(sound)
					.expect(200)
					.end(function(soundSaveErr, soundSaveRes) {
						// Handle Sound save error
						if (soundSaveErr) done(soundSaveErr);

						// Update Sound name
						sound.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Sound
						agent.put('/api/sounds/' + soundSaveRes.body._id)
							.send(sound)
							.expect(200)
							.end(function(soundUpdateErr, soundUpdateRes) {
								// Handle Sound update error
								if (soundUpdateErr) done(soundUpdateErr);

								// Set assertions
								(soundUpdateRes.body._id).should.equal(soundSaveRes.body._id);
								(soundUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Sounds if not signed in', function(done) {
		// Create new Sound model instance
		var soundObj = new Sound(sound);

		// Save the Sound
		soundObj.save(function() {
			// Request Sounds
			request(app).get('/api/sounds')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Sound if not signed in', function(done) {
		// Create new Sound model instance
		var soundObj = new Sound(sound);

		// Save the Sound
		soundObj.save(function() {
			request(app).get('/api/sounds/' + soundObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', sound.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Sound instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Sound
				agent.post('/api/sounds')
					.send(sound)
					.expect(200)
					.end(function(soundSaveErr, soundSaveRes) {
						// Handle Sound save error
						if (soundSaveErr) done(soundSaveErr);

						// Delete existing Sound
						agent.delete('/api/sounds/' + soundSaveRes.body._id)
							.send(sound)
							.expect(200)
							.end(function(soundDeleteErr, soundDeleteRes) {
								// Handle Sound error error
								if (soundDeleteErr) done(soundDeleteErr);

								// Set assertions
								(soundDeleteRes.body._id).should.equal(soundSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Sound instance if not signed in', function(done) {
		// Set Sound user 
		sound.user = user;

		// Create new Sound model instance
		var soundObj = new Sound(sound);

		// Save the Sound
		soundObj.save(function() {
			// Try deleting Sound
			request(app).delete('/api/sounds/' + soundObj._id)
			.expect(403)
			.end(function(soundDeleteErr, soundDeleteRes) {
				// Set message assertion
				(soundDeleteRes.body.message).should.match('User is not authorized');

				// Handle Sound error error
				done(soundDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec(function(){
			Sound.remove().exec(function(){
				done();
			});
		});
	});
});
