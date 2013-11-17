var Builder = require('component-builder');
var plugin = require('../');
var fs = require('fs');

var builder = new Builder(__dirname);
builder.use(plugin);
builder.build(function (err, build) {
  if (err) throw err;
  fs.writeFileSync('./build.js', build.require + build.js);
});
