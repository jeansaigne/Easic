'use strict';

module.exports = function(app) {
	var playlists = require('../controllers/playlists.server.controller');
	var playlistsPolicy = require('../policies/playlists.server.policy');

	// Playlists Routes
	app.route('/api/playlists').all()
		.get(playlists.list).all(playlistsPolicy.isAllowed)
		.post(playlists.createPlaylist);

	app.route('/api/playlists/:userId').all(playlistsPolicy.isAllowed)
		.get(playlists.playlistByUserID).all(playlistsPolicy.hasPlaylistOwnerAuthorization)
		.put(playlists.updatePlaylist)
		.delete(playlists.deletePlaylist);
};
