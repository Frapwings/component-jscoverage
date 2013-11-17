'use strict';

/**
 * import(s)
 */

var fs = require('fs');
var exists = fs.openSync;
var open = fs.openSync;
var read = fs.readFileSync;
var unlink = fs.unlinkSync;
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
  var hello_coverage_path = __dirname + '/fixtures/hello/hello-cov.js';
  var world_coverage_path = __dirname + '/fixtures/hello/world-cov.js';

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

    after(function (done) {
      unlink(hello_coverage_path);
      unlink(world_coverage_path);
      done();
    });

    describe('generated coverage file', function () {
      describe('javascript', function () {
        it('expect to exists', function (done) {
          expect(open(hello_coverage_path, 'r')).to.be.ok();
          expect(read(hello_coverage_path, 'utf8')).to.eql(this.hello_coverage_str)
          expect(open(world_coverage_path, 'r')).to.be.ok();
          expect(read(world_coverage_path, 'utf8')).to.eql(this.world_coverage_str)
          done();
        });
      });
      describe('other lang', function () {
        it('expect to not exists', function (done) {
          expect(function () { open(__dirname + '/fixtures/hello/coffee-cov.js'); }).to.throwException(function (e) {
            expect(e).to.be.an(Error);
            done();
          });
        });
      });
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

    describe('generated coverage file', function () {
      it('expect to not exists', function (done) {
        expect(function () { open(__dirname + '/fixtures/null/hello-cov.js'); }).to.throwException(function (e) {
          expect(e).to.be.an(Error);
          done();
        });
      });
    });
    describe('build javascript', function () {
      it('exptect to be empty', function (done) {
        expect(this.resource.js).to.be.empty();
        done();
      });
    });
  });
});
