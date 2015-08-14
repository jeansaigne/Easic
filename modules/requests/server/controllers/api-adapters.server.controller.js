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

    youTube.search(params.q, 20, function(error, results) {
        var formattedResults = [];
        var formattedMetas = {};
        formattedMetas = results.pageInfo;
        formattedMetas.nextPage = results.nextPageToken;
        for (var video in results.items) {
            var item = {};
            item.title = results.items[video].snippet.title;
            item.type = 'youtube';
            item.url = results.items[video].id.videoId || results.items[video].id.playlistId || results.items[video].id.channelId;
            item.image = results.items[video].snippet.thumbnails.medium.url;
            item.kind = results.items[video].id.kind.slice(8);
            formattedResults.push(item);
        }
        var formattedResponse = {
            youtube: {
                infos : formattedMetas,
                items : formattedResults
            }
        };
        callback(error, formattedResponse);
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
    SC.get('/tracks', { q: params.q, limit: 20 }, function(err, results) {
        var formattedResults = [];
        var formattedMetas = {};
        formattedMetas.perPage = results.length;
        //formattedMetas.nextPage = results.nextPageToken;
        for (var video in results) {
            var item = {};
            item.title = results[video].title;
            item.type = 'soundcloud';
            item.url = results[video].stream_url;
            item.image = results[video].artwork_url || '/images/sound_default.png';
            item.kind = results[video].kind;
            item.duration = results[video].duration;
            item.waveform = results[video].waveform_url;
            formattedResults.push(item);
        }
        var formattedResponse = {
            soundcloud: {
                infos : formattedMetas,
                items : formattedResults
            }
        };
        callback(err, formattedResponse);
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
        var formattedResults = [];
        var formattedMetas = {};
        formattedMetas.totalResults = results.total;
        formattedMetas.nextPage = results.paging.next;
        formattedMetas.perPage = results.per_page;
        for (var video in results.data) {
            var item = {};
            item.title = results.data[video].name;
            item.type = 'vimeo';
            item.url = results.data[video].uri;
            item.image = results.data[video].pictures.sizes[3].link || '/images/sound_default.png';
            item.embed = results.data[video].embed.html;
            formattedResults.push(item);
        }
        var formattedResponse = {
            vimeo: {
                infos : formattedMetas,
                items : formattedResults
            }
        };
        callback(err, formattedResponse);
    });
};

/*
* Deezer api adapter
* */
exports.deezerApi = function(params, callback) {
    var deezer = require('node-deezer-api-client');
    deezer.requestData('/search?q=track:\''+params.q+'\'&limit=20', function(err, results) {
        var formattedResults = [];
        var formattedMetas = {};
        formattedMetas.totalResults = results.total;
        formattedMetas.nextPage = results.next;
        for (var video in results.data) {
            var item = {};
            item.title = results.data[video].title;
            item.type = 'deezer';
            item.url = results.data[video].id;
            item.image = results.data[video].artist.picture_medium || '/images/sound_default.png';
            item.kind = results.data[video].type;
            item.duration = results.data[video].duration;
            formattedResults.push(item);
        }
        var formattedResponse = {
            deezer: {
                infos : formattedMetas,
                items : formattedResults
            }
        };
        callback(err, formattedResponse);
    });
};

/*
* Spotify api adapter
* */
exports.spotifyApi = function(params, callback) {
    var spotify = require('spotify');
    spotify.search({ type: 'track', query: params.q, limit: '2' }, function(err, results) {
        var formattedResults = [];
        var formattedMetas = {};
        formattedMetas.totalResults = results.tracks.total;
        formattedMetas.perPage = results.tracks.limit;
        formattedMetas.nextPage = results.tracks.next;
        for (var video in results.tracks.items) {
            var item = {};
            item.title = results.tracks.items[video].name;
            item.type = 'deezer';
            item.url = results.tracks.items[video].href;
            item.image = results.tracks.items[video].album.images[1].url || '/images/sound_default.png';
            item.kind = results.tracks.items[video].type;
            item.duration = results.tracks.items[video].duration_ms;
            item.uri = results.tracks.items[video].uri;
            formattedResults.push(item);
        }
        var formattedResponse = {
            spotify: {
                infos : formattedMetas,
                items : formattedResults
            }
        };
        callback(err, formattedResponse);
    });
};
