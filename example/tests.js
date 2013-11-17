var assert = require('assert');
var add = require('hello');

describe('hello', function () {
  it('should be 2', function (done) {
    assert(2 === add(1, 1));
    done();
  });
});
