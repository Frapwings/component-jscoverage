SRC = $(wildcard ./*.js)
COMPONENT = ../node_modules/.bin/component
JSCOVERAGE = ../node_modules/.bin/jscoverage

components: component.json
	@../node_modules/.bin/component install

build: components $(SRC)
	@node ./builder.js

test: build
	open ./index.html

test-phatomjs: build
	../node_modules/.bin/mocha-phantomjs ./index.html

test-cov: build
	../node_modules/.bin/mocha-phantomjs -R json-cov ./index.html | ../node_modules/.bin/json2htmlcov > ./cover.html
	open ./cover.html

clean:
	@rm -fr ./components
	@rm ./build.js

.PHONY: clean test
