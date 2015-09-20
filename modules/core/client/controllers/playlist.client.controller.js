/**
 * Created by lardtiste on 20/09/15.
 */
'use strict';

angular.module('core').controller('PlaylistController', ['$scope', 'PlaylistService', '$stateParams', 'Authentication', 'Playlists',
    function($scope, PlaylistService, $stateParams, Authentication, Playlists) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.playlistService = PlaylistService;

        $scope.removeSound = function(soundToDelete){
            $scope.playlistService.sendCommand('deleteSound', soundToDelete);
        };

        $scope.removeAllSound = function(soundToDelete){
            $scope.playlistService.sendCommand('deleteAllSound');
        };

        $scope.saveList = function(){
            var soundsOfPlaylist = [];
            $scope.playlistService.sounds.forEach(function(sound, index){
                var sound = sound;
                sound.order = index;
                soundsOfPlaylist.push(sound);
            });
            var result = prompt("Nom de la playlist", "Nouvelle playlist");
            var playlist = {
                title : result,
                sounds : soundsOfPlaylist
            };
        };

        // Create new Playlist
        $scope.create = function() {
            // Create new Playlist object
            var playlist = new Playlists ({
                name: this.name
            });

            // Redirect after save
            playlist.$save(function(response) {
                //$location.path('playlists/' + response._id);

                // Clear form fields
                $scope.name = '';
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Remove existing Playlist
        $scope.remove = function( playlist ) {
            if ( playlist ) { playlist.$remove();

                for (var i in $scope.playlists ) {
                    if ($scope.playlists [i] === playlist ) {
                        $scope.playlists.splice(i, 1);
                    }
                }
            } else {
                $scope.playlist.$remove(function() {
                    //$location.path('playlists');
                });
            }
        };

        // Update existing Playlist
        $scope.update = function() {
            var playlist = $scope.playlist ;

            playlist.$update(function() {
                //$location.path('playlists/' + playlist._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Find a list of Playlists
        $scope.find = function() {
            $scope.playlists = Playlists.query();
        };

        // Find existing Playlist
        $scope.findOne = function() {
            $scope.playlist = Playlists.get({
                playlistId: $stateParams.playlistId
            });
        };
    }
]);
