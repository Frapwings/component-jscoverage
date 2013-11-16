'use strict';

/**
 * import(s)
 */

var expect = require('expect.js');
var Builder = require('component-builder');
var jscover = require(process.env.COMPONENT_JSCOVERAGE_COV ? '../lib-cov/' : '../');


/**
 * test(s)
 */
describe('component-jsoverage', function () {
  it('should be 2', function (done) {
    expect(jscover()).to.eql(2);
    done();
  });
});
