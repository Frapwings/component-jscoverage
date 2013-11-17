/**
 * Import(s)
 */

var path = require('path');
var fs = require('fs');
var read = fs.readFileSync;
var write = fs.writeFileSync;
var debug = require('debug')('component:jscoverage');
var generateJsCoverage = require('jscoverage').process;

/**
 * Export(s)
 */

module.exports = plugin;


function plugin (builder) {
  builder.hook('before scripts', function (pkg, next) {
    if (!pkg.root) return next();

    var scripts = pkg.config.scripts;
    debug('before scripts: %j', scripts);
    if (!scripts) return next();

    var mapper = {};
    scripts.forEach(function (script) {
      var ext = path.extname(script);
      if (ext !== '.js') return;

      var script_path = pkg.path(script);
      var str = read(script_path, 'utf8').toString();
      var content = generateJsCoverage(script_path, str);
      mapper[script] = content;
    });
    debug('after scripts: %j', scripts);

    Object.keys(mapper).forEach(function (script) {
      pkg.removeFile('scripts', script);
      pkg.addFile('scripts', script, mapper[script]);
    });
    debug('build scripts: %j', scripts);

    next();
  });
}
