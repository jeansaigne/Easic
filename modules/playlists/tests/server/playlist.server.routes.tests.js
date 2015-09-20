'use strict';

var should = require('should'),
	request = require('supertest'),
	path = require('path'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Playlist = mongoose.model('Playlist'),
	express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, playlist;

/**
 * Playlist routes tests
 */
describe('Playlist CRUD tests', function() {
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

		// Save a user to the test db and create new Playlist
		user.save(function() {
			playlist = {
				name: 'Playlist Name'
			};

			done();
		});
	});

	it('should be able to save Playlist instance if logged in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Playlist
				agent.post('/api/playlists')
					.send(playlist)
					.expect(200)
					.end(function(playlistSaveErr, playlistSaveRes) {
						// Handle Playlist save error
						if (playlistSaveErr) done(playlistSaveErr);

						// Get a list of Playlists
						agent.get('/api/playlists')
							.end(function(playlistsGetErr, playlistsGetRes) {
								// Handle Playlist save error
								if (playlistsGetErr) done(playlistsGetErr);

								// Get Playlists list
								var playlists = playlistsGetRes.body;

								// Set assertions
								(playlists[0].user._id).should.equal(userId);
								(playlists[0].name).should.match('Playlist Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Playlist instance if not logged in', function(done) {
		agent.post('/api/playlists')
			.send(playlist)
			.expect(403)
			.end(function(playlistSaveErr, playlistSaveRes) {
				// Call the assertion callback
				done(playlistSaveErr);
			});
	});

	it('should not be able to save Playlist instance if no name is provided', function(done) {
		// Invalidate name field
		playlist.name = '';

		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Playlist
				agent.post('/api/playlists')
					.send(playlist)
					.expect(400)
					.end(function(playlistSaveErr, playlistSaveRes) {
						// Set message assertion
						(playlistSaveRes.body.message).should.match('Please fill Playlist name');
						
						// Handle Playlist save error
						done(playlistSaveErr);
					});
			});
	});

	it('should be able to update Playlist instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Playlist
				agent.post('/api/playlists')
					.send(playlist)
					.expect(200)
					.end(function(playlistSaveErr, playlistSaveRes) {
						// Handle Playlist save error
						if (playlistSaveErr) done(playlistSaveErr);

						// Update Playlist name
						playlist.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Playlist
						agent.put('/api/playlists/' + playlistSaveRes.body._id)
							.send(playlist)
							.expect(200)
							.end(function(playlistUpdateErr, playlistUpdateRes) {
								// Handle Playlist update error
								if (playlistUpdateErr) done(playlistUpdateErr);

								// Set assertions
								(playlistUpdateRes.body._id).should.equal(playlistSaveRes.body._id);
								(playlistUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Playlists if not signed in', function(done) {
		// Create new Playlist model instance
		var playlistObj = new Playlist(playlist);

		// Save the Playlist
		playlistObj.save(function() {
			// Request Playlists
			request(app).get('/api/playlists')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Playlist if not signed in', function(done) {
		// Create new Playlist model instance
		var playlistObj = new Playlist(playlist);

		// Save the Playlist
		playlistObj.save(function() {
			request(app).get('/api/playlists/' + playlistObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', playlist.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Playlist instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Playlist
				agent.post('/api/playlists')
					.send(playlist)
					.expect(200)
					.end(function(playlistSaveErr, playlistSaveRes) {
						// Handle Playlist save error
						if (playlistSaveErr) done(playlistSaveErr);

						// Delete existing Playlist
						agent.delete('/api/playlists/' + playlistSaveRes.body._id)
							.send(playlist)
							.expect(200)
							.end(function(playlistDeleteErr, playlistDeleteRes) {
								// Handle Playlist error error
								if (playlistDeleteErr) done(playlistDeleteErr);

								// Set assertions
								(playlistDeleteRes.body._id).should.equal(playlistSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Playlist instance if not signed in', function(done) {
		// Set Playlist user 
		playlist.user = user;

		// Create new Playlist model instance
		var playlistObj = new Playlist(playlist);

		// Save the Playlist
		playlistObj.save(function() {
			// Try deleting Playlist
			request(app).delete('/api/playlists/' + playlistObj._id)
			.expect(403)
			.end(function(playlistDeleteErr, playlistDeleteRes) {
				// Set message assertion
				(playlistDeleteRes.body.message).should.match('User is not authorized');

				// Handle Playlist error error
				done(playlistDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec(function(){
			Playlist.remove().exec(function(){
				done();
			});
		});
	});
});
