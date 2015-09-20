/**
 * Created by lardtiste on 20/09/15.
 */
'use strict';

angular.module('core').controller('PlaylistController', ['$scope', 'Authentication', 'PlaylistService',
    function($scope, Authentication, PlaylistService) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.playlistService = PlaylistService;

        $scope.removeSound = function(soundToDelete){
            $scope.playlistService.sendCommand('deleteSound', soundToDelete);
        };

        $scope.removeAllSound = function(soundToDelete){
            $scope.playlistService.sendCommand('deleteAllSound');
        };

    }
]);
