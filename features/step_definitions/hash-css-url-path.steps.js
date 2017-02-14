var File = require('gulp-util').File;
var Buffer = require('buffer').Buffer;

module.exports = function() {
  'use strict';

  this.World = require('../support/world').World;

  this.Given(/^I have declared dependencies in an html file using css url\(\) with revision tokens$/, function (callback) {

    this.indexFile = new File({
      cwd: 'test/fixtures/',
      base: 'test/fixtures/static',
      path: 'test/fixtures/static/absolute-path-index.html',
      contents: new Buffer(this.htmlFileContents('css-url-index'))
    });
    callback();

  });

  this.Given(/^I have declared dependencies in an html file using css background url\(\) with revision tokens$/, function (callback) {

    this.indexFile = new File({
      cwd: 'test/fixtures/',
      base: 'test/fixtures/static',
      path: 'test/fixtures/static/absolute-path-index.html',
      contents: new Buffer(this.htmlFileContents('css-background-index'))
    });
    callback();

  });

};