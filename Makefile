REPORTER = spec

test:
	@NODE_ENV=test ./node_modules/.bin/mocha --reporter $(REPORTER) ./test/*.js

test-cov: lib-cov
	@COMPONENT_JSCOVERAGE_COV=1 $(MAKE) test REPORTER=html-cov > coverage.html
	@rm -rf lib-cov

lib-cov:
	@./node_modules/.bin/jscoverage ./index.js ./lib-cov/index.js

test-coveralls: lib-cov
	echo TRAVIS_JOB_ID $(TRAVIS_JOB_ID)
	@COMPONENT_JSCOVERAGE_COV=1 $(MAKE) test REPORTER=mocha-lcov-reporter | ./node_modules/coveralls/bin/coveralls.js
	@rm -rf lib-cov

.PHONY: test
