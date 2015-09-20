'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Playlist Schema
 */
var PlaylistSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	title: {
		type: String,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	},
	description: {
		type: String,
		default: '',
		trim: true
	},
	owner: {
		type: Schema.ObjectId,
		ref: 'User',
		required: true
	},
	users: [{
		type: Schema.ObjectId,
		ref: 'User'
	}],
	sounds: [{
		created: {
			type: Date,
			default: Date.now
		},
		title: {
			type: String,
			trim: true,
			required: 'Title cannot be blank'
		},
		order: {
			type: Number,
			required: 'Order cannot be null'
		},
		sourceName: {
			type: String,
			trim: true,
			required: 'sourceName cannot be blank'
		},
		sourceId: {
			type: String,
			default: '',
			trim: true,
			required: 'SourceId cannot be blank'
		},
		playlistId:{
			type: String,
			default: '',
			trim: true
		},
		duration:{
			type: Number,
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
		available: {
			type: Boolean,
			default: true
		}
	}]
});

mongoose.model('Playlist', PlaylistSchema);
