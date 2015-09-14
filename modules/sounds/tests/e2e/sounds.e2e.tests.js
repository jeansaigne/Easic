'use strict';

describe('Sounds E2E Tests:', function() {
	describe('Test Sounds page', function() {
		it('Should not include new Sounds', function() {
			browser.get('http://localhost:3000/#!/sounds');
			expect(element.all(by.repeater('sound in sounds')).count()).toEqual(0);
		});
	});
});
