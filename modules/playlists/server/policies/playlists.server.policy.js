'use strict';

/**
 * Module dependencies.
 */
var acl = require('acl'),
    mongoose = require('mongoose'),
    Playlist = mongoose.model('Playlist');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Playlists Permissions
 */
exports.invokeRolesPolicies = function() {
    acl.allow([{
        roles: ['admin'],
        allows: [{
            resources: '/api/playlists',
            permissions: '*'
        }, {
            resources: '/api/playlists/:playlistId',
            permissions: '*'
        }]
    }, {
        roles: ['user'],
        allows: [{
            resources: '/api/playlists',
            permissions: ['get', 'post']
        }, {
            resources: '/api/playlists/:playlistId',
            permissions: ['get']
        }]
    }, {
        roles: ['guest'],
        allows: [{
            resources: '/api/playlists',
            permissions: ['get']
        }, {
            resources: '/api/playlists/:playlistId',
            permissions: ['get']
        }]
    }]);
};

/**
 * Check If Articles Policy Allows
 */
exports.isAllowed = function(req, res, next) {
    var roles = (req.user) ? req.user.roles : ['guest'];

    // If an playlist is being processed and the current user created it then allow any manipulation
    if (req.playlist && req.user && req.playlist.user.id === req.user.id) {
        return next();
    }

    // Check for user roles
    acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function(err, isAllowed) {
        if (err) {
            // An authorization error occurred.
            return res.status(500).send('Unexpected authorization error');
        } else {
            if (isAllowed) {
                // Access granted! Invoke next middleware
                return next();
            } else {
                return res.status(403).json({
                    message: 'User is not authorized'
                });
            }
        }
    });
};


/**
 * Sound authorization middleware
 */
exports.hasPlaylistOwnerAuthorization = function(req, res, next) {
    console.log(req.playlist);
    // console.log(req);
    var playlist = null;
    playlist = (req.playlist) ? new Playlist(req.playlist) : new Playlist(req.body);
    Playlist.findById(playlist.playlist, function(err, playlist){
        console.log(req.user._id);
        if (playlist.owner.equals(req.user._id)) next();
        for (var i=0; i<playlist.users.length;i++) {
            if (playlist.users[i].equals(req.user._id)) next();
        }
        return res.status(403).send({message: 'User is not authorized'});

    });


};
