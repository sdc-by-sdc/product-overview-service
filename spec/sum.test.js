const sum = require('./sumTest.js');

describe('sum test', function() {
  it('should add numbers', function() {
    expect(sum(1, 2)).toBe(3);
  })
})