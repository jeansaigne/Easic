/**
 * Created by lardtiste on 20/09/15.
 */
'use strict';

angular.module('core').factory('PlaylistService', ['Authentication','$timeout','Socket',
    function(Authentication, $timeout, Socket) {
        var _this = this;
        var authentication = Authentication;
        _this._data = {
            sounds: window.sounds,
            playlists: window.playlists,
            sendCommand: function(nomCommand, sound, playlist, isDouble){
                var commande = {
                    nom : nomCommand,
                    sound: sound,
                    playlist: playlist,
                    isDouble: isDouble
                };
                var message = {
                    pseudo: 'server',
                    date: Date(),
                    corps: authentication.user.displayName+' a lancé la commande '+commande.nom
                };
                //if(conf.isInPublicRoom){
                //    Socket.emit('room.event', {roomTitle: conf.room.title, message: message});
                //    Socket.emit('playlist.event', {roomTitle: conf.room.title, commande: commande});
                //}else{
                    this.processCommand(commande);
                //}

            },
            processCommand: function(command){
                if((command.nom === 'addSound')&&(command.sound.url && (command.sound.url !== ''))){
                    this.processAddSound(command.sound);
                }else if(command.nom === 'deleteSound'){
                    this.processDeleteSound(command.sound);
                }else if(command.nom === 'newPlaylist'){
                    this.processNewPlaylist(command.playlist);
                }else if(command.nom === 'changeOrder'){
                    this.processChangeOrder(command.sound);
                }else if(command.nom === 'deleteAllSound'){
                    this.processDeleteAllSound();
                }
                //else if(command.nom === 'double'){
                //    console.log(angular.element('#'))
                //    conf.isDouble = command.isDouble;
                //    if(conf.isDouble){
                //        angular.element('#playerRightContent').addClass('doublePlayer').removeClass('displayNone');
                //        angular.element('#playerLeftContent').addClass('doublePlayer').removeClass('singlePlayer');
                //    }else{
                //        angular.element('#playerRightContent').addClass('displayNone').removeClass('doublePlayer');
                //        angular.element('#playerLeftContent').addClass('singlePlayer').removeClass('doublePlayer');
                //    }
                //}
            },
            processAddSound: function(soundToAdd){
                if(typeof this.sounds === 'undefined'){
                    this.sounds = [];
                }
                this.sounds.push(soundToAdd);
            },
            processDeleteSound: function(soundToDelete){
                var _this = this;
                if(typeof this.sounds === 'undefined'){
                    this.sounds = [];
                }
                this.sounds.forEach(function(sound, index){
                    if(sound.url === soundToDelete.url){
                        _this.sounds.splice(index, 1);
                    }
                });
                //conf.showMessage('Element supprimé', 'warning');
            },
            processDeleteAllSound: function(){
                this.sounds = [];
            },
            processNewPlaylist: function(newPlaylist){
                if(typeof newPlaylist === 'undefined'){
                    newPlaylist = [];
                }
                this.sounds = newPlaylist;
            },
            processChangeOrder: function(soundFirst){
                var indexOfSoundFirst = 0;
                var tmp = [];
                var tmpLast = [];
                this.sounds.forEach(function(sound, index){
                    if(sound.url === soundFirst.url){
                        indexOfSoundFirst = index;
                    }
                });
                this.sounds.forEach(function(sound, index){
                    if(index >= indexOfSoundFirst){
                        tmp.push(sound);
                    }else{
                        tmpLast.push(sound);
                    }
                });
                this.sounds = tmp.concat(tmpLast);
            }
        };
        return _this._data;
    }
]);
