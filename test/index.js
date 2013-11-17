'use strict';

/**
 * import(s)
 */

var fs = require('fs');
var read = fs.readFileSync;
var generateJsCoverage = require('jscoverage').process;
var expect = require('expect.js');
var Builder = require('component-builder');
var plugin = require(process.env.COMPONENT_JSCOVERAGE_COV ? '../lib-cov/' : '../');


/**
 * test(s)
 */

describe('component-jscoverage', function () {
  var hello_path = __dirname + '/fixtures/hello/hello.js';
  var world_path = __dirname + '/fixtures/hello/world.js';

  describe('exist scripts', function () {
    before(function (done) {
      this.hello_coverage_str = generateJsCoverage(hello_path, read(hello_path, 'utf8').toString());
      this.world_coverage_str = generateJsCoverage(world_path, read(world_path, 'utf8').toString());

      var builder = new Builder(__dirname + '/fixtures/hello');
      builder.use(plugin);
      builder.build(function (err, res) {
        if (err) return done(err);
        this.resource = res;
        done();
      }.bind(this));
    });

    describe('build javascript', function () {
      it('expect to contain coverage script string', function (done) {
        expect(this.resource.js).to.contain(this.hello_coverage_str);
        expect(this.resource.js).to.contain(this.world_coverage_str);
        done();
      });
    });
  });

  describe('not exist scripts', function () {
    before(function (done) {
      var builder = new Builder(__dirname + '/fixtures/null');
      builder.use(plugin);
      builder.build(function (err, res) {
        if (err) return done(err);
        this.resource = res;
        done();
      }.bind(this));
    });

    describe('build javascript', function () {
      it('exptect to be empty', function (done) {
        expect(this.resource.js).to.be.empty();
        done();
      });
    });
  });
});
