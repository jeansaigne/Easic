'use strict';

module.exports = {
	db: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/sandbox',
	facebook: {
		clientID: process.env.FACEBOOK_ID || '289205664536716',
		clientSecret: process.env.FACEBOOK_SECRET || '7f3f3deac84da91ab8b7c5c9c92f3c8d',
		callbackURL: '/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || '3GdhYHWifn7DI2dym636Kp9O5',
		clientSecret: process.env.TWITTER_SECRET || 'hptITV1EiSHcHutnew2K1GJLQx1iHDkYwY9vtm09Eb1CdAKQ38',
		callbackURL: '/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || '27426182957.apps.googleusercontent.com',
		clientSecret: process.env.GOOGLE_SECRET || 'nqlzJsJxdEFZX7wF-p8o0hHd',
		callbackURL: '/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || '771iljxjoiaar0',
		clientSecret: process.env.LINKEDIN_SECRET || 'mPJ7VGla715iqAza',
		callbackURL: '/auth/linkedin/callback'
	},
	github: {
		clientID: process.env.GITHUB_ID || 'af91a0d1923f67e129de',
		clientSecret: process.env.GITHUB_SECRET || '06c28eaafda9683241ed886b0d8cf57ff28737ba',
		callbackURL: '/auth/github/callback'
	},
	mailer: {
		from: process.env.MAILER_FROM || 'MAILER_FROM',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
				pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
			}
		}
	}
};
