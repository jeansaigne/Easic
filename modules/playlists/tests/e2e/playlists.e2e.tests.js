'use strict';

describe('Playlists E2E Tests:', function() {
	describe('Test Playlists page', function() {
		it('Should not include new Playlists', function() {
			browser.get('http://localhost:3000/#!/playlists');
			expect(element.all(by.repeater('playlist in playlists')).count()).toEqual(0);
		});
	});
});
