/**
 * Created by mc on 11/08/15.
 */
'use strict';

/**
 * Youtube api adapter
 */
exports.youtubeApi = function(params, callback) {
    var YouTube = require('youtube-node');
    var youTube = new YouTube();

    youTube.setKey('AIzaSyBVsIBrr7VmuhNN-NvRVWw-gZA4vjj1YeA');

    youTube.search(params.q, 20, function(error, result) {
        if (error) {
            callback({message: 'getYoutubeMedias: Une erreur s\'est produite.'}, null);
        }
        else {
            callback(null, {youtube : result});
        }
    });
};

/*
* Soundcloud api adapter
* */
exports.soundcloudApi = function(params, callback) {
    var SC = require('node-soundcloud');
    SC.init({
        id: '297a1ba0221212502262213f257f0e7f'
    });
    SC.get('/tracks', { q: params.q, limit: 20 }, function(err, tracks) {
        if (err)
            callback(err,null);
        else
            callback(null,{soundcloud: tracks});
    });
};

/*
* TODO Dailymotion api adapter
* */
exports.dailymotionApi = function(params, callback) {
 callback(null, {});
};

/*
* Vimeo api adapter
* */
exports.vimeoApi = function(params, callback) {
    var Vimeo = require('vimeo').Vimeo;
    console.log(params);
    var lib = new Vimeo('fdfd207f8a4d8e18f98a5355f81906130e60fd35', 'gNP2iwWTv5nm+q68KWIog1bQKBGA+k3n7X9pelhhpjmYvRWw+Ks75LCezMMW/dSrubwp8yJcMxy2CFoID4z5Rua03DgFRyRTGBPanPyv25jedEBUJSmqSCs5y4i5y6k4', '3362e455675da4faa4a27a67554df2e4');
    lib.request({
        // This is the path for the videos contained within the staff picks channels
        path : '/videos',
        // This adds the parameters to request page two, and 10 items per page
        query : {
            query: params.q,
            per_page : 20,
            fields: 'uri,name,description,link,duration,embed,content_rating,pictures'
        }
    }, function(err, results) {
        callback(err,{vimeo: results});
    });
};

/*
* Deezer api adapter
* */
exports.deezerApi = function(params, callback) {
    var deezer = require('node-deezer-api-client');
    deezer.requestData('/search?q=track:\''+params.q+'\'&limit=20', function(err, results) {
        callback(err, {deezer: results});
    });
};

/*
* Spotify api adapter
* */
exports.spotifyApi = function(params, callback) {
    var spotify = require('spotify');
    spotify.search({ type: 'track', params: params.q, limit: '20' }, function(err, data) {
        callback(err, {spotify: data});
    });
};
