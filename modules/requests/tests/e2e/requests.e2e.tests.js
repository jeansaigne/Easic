'use strict';

describe('Requests E2E Tests:', function() {
	describe('Test Requests page', function() {
		it('Should not include new Requests', function() {
			browser.get('http://localhost:3000/#!/requests');
			expect(element.all(by.repeater('request in requests')).count()).toEqual(0);
		});
	});
});
