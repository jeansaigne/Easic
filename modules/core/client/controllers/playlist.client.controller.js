/**
 * Created by lardtiste on 20/09/15.
 */
'use strict';

angular.module('core').controller('PlaylistController', ['$scope', 'PlaylistService', '$stateParams', 'Authentication', 'Playlists',
    function($scope, PlaylistService, $stateParams, Authentication, Playlists) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.playlistService = PlaylistService;

        $scope.playlistService.updatePlaylists();

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
            $scope.create(playlist);
        };

        $scope.removePlaylist = function(playlist){
            $scope.remove(playlist)
        };

        // Create new Playlist
        $scope.create = function(playlist) {
            // Create new Playlist object
            var playlist = new Playlists ({
                title: playlist.title,
                description : "",
                sounds : playlist.sounds
            });

            // Redirect after save
            playlist.$save(function(response) {
                console.log(response);
                $scope.playlistService.updatePlaylists();

            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Remove existing Playlist
        $scope.remove = function( playlist ) {
            if ( playlist ) {
                playlist.$remove(function(result){
                    console.log(result);
                    $scope.playlistService.updatePlaylists();
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

        //// Find existing Playlist
        //$scope.findOne = function() {
        //    $scope.playlist = Playlists.get({
        //        playlistId: $stateParams.playlistId
        //    });
        //};
    }
]);
