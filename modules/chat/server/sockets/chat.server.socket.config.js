'use strict';

// Create the chat configuration
module.exports = function(io, socket) {
    //Change dynamically the name of the default room to username
	// Emit the status event when a new socket client is connected
    socket.join(socket.request.user.username);
    if (global.chatRooms.hasOwnProperty(socket.request.user.username) && global.chatRooms[socket.request.user.username].indexOf(socket.request.user.username)===-1)
        global.chatRooms[socket.request.user.username].push(socket.request.user.username);
    else {
        global.chatRooms[socket.request.user.username] = [socket.request.user.username];
        io.emit('chatMessage', {
            type: 'status',
            text: 'Is now connected to ' + socket.request.user.username + '\'s room',
            room: socket.request.user.username,
            rooms: global.chatRooms,
            created: Date.now(),
            profileImageURL: socket.request.user.profileImageURL,
            username: socket.request.user.username
        });
    }

    // Send a chat messages to all connected sockets when a message is received 
    socket.on('chatMessage', function(message) {
        message.created = Date.now();
        message.profileImageURL = socket.request.user.profileImageURL;
        message.username = socket.request.user.username;
        message.rooms = global.chatRooms;
        if (message.type === 'join') {
            socket.leave(message.room);
            if (global.chatRooms[message.room].length === 1) {
                delete global.chatRooms[message.room];
            } else {
                global.chatRooms[message.room].splice(global.chatRooms[message.room].indexOf(socket.request.user.username), 1);
            }
            socket.join(message.join);
            if (global.chatRooms.hasOwnProperty(message.join))
                global.chatRooms[message.join].push(socket.request.user.username);
            else
                global.chatRooms[message.join] = [socket.request.user.username];
            message.rooms = global.chatRooms;
            message.text = 'Is now connected to ' + message.join + '\'s room';
            message.type = 'status';
            message.room = message.join;
            io.emit('chatMessage', message);

        } else {
            message.type = 'message';
            // Emit the 'chatMessage' event
            io.to(message.room).emit('chatMessage', message);
        }
    });

    // Emit the status event when a socket client is disconnected
    socket.on('disconnect', function() {
        //console.log(this);
        /*if (global.chatRooms[$scope.room].length === 1) {
            delete global.chatRooms[$scope.room];
        } else {
            global.chatRooms[$scope.room].splice(global.chatRooms[$scope.room].indexOf(socket.request.user.username), 1);
        }*/
        for (var roomindex in global.chatRooms) {
            if (global.chatRooms[roomindex].indexOf(socket.request.user.username)!==-1)
                global.chatRooms[roomindex].splice(global.chatRooms[roomindex].indexOf(socket.request.user.username), 1);
            if (!global.chatRooms[roomindex].length)
                delete global.chatRooms[roomindex];
        }

        io.emit('chatMessage', {
            type: 'status',
            text: 'disconnected',
            created: Date.now(),
            rooms: global.chatRooms,
            username: socket.request.user.username
        });
    });
};
