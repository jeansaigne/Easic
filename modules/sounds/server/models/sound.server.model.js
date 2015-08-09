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
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	},
	type: {
		type: Number,
		default: 0,
		trim: true,
		required: 'Type cannot be blank'
	},
	url: {
		type: String,
		default: '',
		trim: true,
		required: 'Url cannot be blank'
	},
	kind: {
		type: String,
		default: '',
		trim: true,
		required: 'Kind cannot be blank'
	},
	playlistId:{
		type: String,
		default: '',
		trim: true
	},
	duration:{
		type: String,
		default: '00:00:00',
		trim: true
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
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	available: {
		type: Boolean,
		default: false
	}
});

mongoose.model('Sound', SoundSchema);
