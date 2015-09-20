/**
 * Created by lardtiste on 19/09/15.
 */
'use strict';

angular.module('core').directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind('keydown keypress', function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});

angular.module('core').directive('exploreContainer', function(){
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'modules/core/views/explore.client.view.html'
    };
});
angular.module('core').directive('playerContainer', function(){
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'modules/core/views/player.client.view.html'
    };
});
angular.module('core').directive('playlistContainer', function(){
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'modules/core/views/playlist.client.view.html'
    };
});
angular.module('core').directive('salonContainer', function(){
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'modules/core/views/salon.client.view.html'
    };
});

