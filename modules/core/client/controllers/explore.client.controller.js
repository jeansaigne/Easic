/**
 * Created by lardtiste on 19/09/15.
 */
'use strict';

angular.module('core').controller('ExploreController', ['$scope', 'Authentication', 'Search', 'PlaylistService',
    function($scope, Authentication, Search, PlaylistService) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.getSearch = function(){
            Search.query({q : $scope.query, sources : ['youtube']}, function(result){
                console.log(result);
                $scope.youtubeResult = result[0].youtube.items;
            });
            Search.query({q : $scope.query, sources : ['vimeo']}, function(result){
                console.log(result);
                $scope.vimeoResult = result[0].vimeo.items;
            });
            Search.query({q : $scope.query, sources : ['soundcloud']}, function(result){
                console.log(result);
                $scope.soundcloudResult = result[0].soundcloud.items;
            });
            Search.query({q : $scope.query, sources : ['deezer']}, function(result){
                console.log(result);
                $scope.deezerResult = result[0].deezer.items;
            });
            Search.query({q : $scope.query, sources : ['spotify']}, function(result){
                console.log(result);
                $scope.spotifyResult = result[0].spotify.items;
            });
        };

        $scope.addToList = function(soundToAdd){
            console.log(soundToAdd);
            PlaylistService.sendCommand('addSound', soundToAdd);
        };
    }
]);
