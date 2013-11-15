# component-jscoverage

[![Build Status](https://travis-ci.org/Frapwings/component-jscoverage.png?branch=master)](https://travis-ci.org/Frapwings/component-jscoverage) [![Coverage Status](https://coveralls.io/repos/Frapwings/component-jscoverage/badge.png)](https://coveralls.io/r/Frapwings/component-jscoverage) [![NPM version](https://badge.fury.io/js/component-jscoverage.png)](http://badge.fury.io/js/component-jscoverage) [![Dependency Status](https://david-dm.org/Frapwings/component-jscoverage.png)](https://david-dm.org/Frapwings/component-jscoverage)

jscoverage plugin for component-builder

# Installing

```
$ npm install component-jscoverage
```

# Usage

To enable jscoverage of your scripts, run the following code.

```js
var Builder = require('component-builder');
var jscover = require('component-jscoverage');
var fs = require('fs');

var builder = new Builder(__dirname);

builder.use(jscover);

builder.build(function (err, build) {
  if (err) {
    throw err;
  }
  fs.writeFileSync('build/build.js', build.require + build.js);
});
```

Or from the command line.

```
$ component build --use component-jscoverage
```

# Testing

```
$ npm install
$ make test
```

# License

[MIT license](http://www.opensource.org/licenses/mit-license.php).

See the `LICENSE`.

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/Frapwings/component-jscoverage/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

