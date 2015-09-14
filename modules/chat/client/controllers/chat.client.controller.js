'use strict';

// Create the 'chat' controller
angular.module('chat').controller('ChatController', ['$scope', 'Socket','Authentication',
    function($scope, Socket, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;
    	// Create a messages array
        $scope.messages = [];
        $scope.room = $scope.authentication.user.username;
        $scope.rooms = {};
        $scope.rooms[$scope.room] = [$scope.authentication.user.username];
        $scope.myroom = $scope.rooms[$scope.room];
        // Add an event listener to the 'chatMessage' event
        Socket.on('chatMessage', function(message) {
            console.log(message);
            if (message.room === $scope.room || message.type === 'status')
                $scope.messages.unshift(message);
            if (message.rooms)
                $scope.rooms = message.rooms;
        });
        
        // Create a controller method for sending messages
        $scope.sendMessage = function() {
            if (this.messageText) {
                // Create a new message object
                var message = {
                    text: this.messageText,
                    room: $scope.room
                };

                // Emit a 'chatMessage' message event
                Socket.emit('chatMessage', message);

                // Clear the message text
                this.messageText = '';
            }
        };

        $scope.join = function() {
            if (this.roomToJoin) {
                // Create a new message object
                var message = {
                    type: 'join',
                    join: this.roomToJoin,
                    room: $scope.room
                };
                // Emit a 'chatMessage' message event
                Socket.emit('chatMessage', message);
                $scope.room = this.roomToJoin;
                // Clear the message text
                this.roomToJoin = '';
            }
        };

        // Remove the event listener when the controller instance is destroyed
        $scope.$on('$destroy', function() {
            Socket.removeListener('chatMessage');
        });

    }
]); 
