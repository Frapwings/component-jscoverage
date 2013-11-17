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


function plugin (builder, options) {
  builder.hook('before scripts', function (pkg, next) {
    var scripts = pkg.config.scripts;
    debug('before scripts: %j', scripts);
    if (!scripts) return next();

    var ignore_scripts = [];
    scripts.forEach(function (script) {
      var ext = path.extname(script);
      if (ext !== '.js') return;

      var script_path = pkg.path(script);
      var str = read(script_path, 'utf8').toString();
      var content = generateJsCoverage(script_path, str);
      var coverage_script_path = path.normalize(path.dirname(script_path) 
        + '/' + path.basename(script_path, ext) + '-cov' + ext);
      write(coverage_script_path, content, 'utf8');
      pkg.addFile('scripts', path.basename(script, ext) + '-cov' + ext);
      ignore_scripts.push(script);
    });
    debug('after scripts: %j', scripts);

    ignore_scripts.forEach(function (script) {
      pkg.removeFile('scripts', script);
    });
    debug('build scripts: %j', scripts);

    next();
  });
}
