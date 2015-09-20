'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Sound Schema
 */
var SoundSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	title: {
		type: String,
		trim: true,
		required: 'Title cannot be blank'
	},
	sourceName: {
		type: String,
		trim: true,
		required: 'Type cannot be blank'
	},
	sourceId: {
		type: String,
		default: '',
		trim: true,
		required: 'Url cannot be blank'
	},
	playlistId:{
		type: String,
		default: '',
		trim: true
	},
	duration:{
		type: timestamp,
		default:0
	},
	image:{
		type: String,
		default: '/images/sound_default.png',
		trim: true
	},
	rate:{
		type: Number,
		default: 0,
		trim: true
	},
	playlists: [{
		type: Schema.Types.ObjectId,
		ref: 'Playlist'
	}],
	owner: {
		type: String,
		trim: true,
		default: 'unknown'
	},
	available: {
		type: Boolean,
		default: true
	}
});

mongoose.model('Sound', SoundSchema);
