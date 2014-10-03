var File = require('gulp-util').File;
var Buffer = require('buffer').Buffer;

module.exports = function() {
  'use strict';

  this.World = require('../support/world').World;

  this.Given(/^I have declared absolute dependencies in an html file with revision tokens$/, function (callback) {

    console.log('load abs.');
    this.indexFile = new File({
      cwd: 'test/fixtures/',
      base: 'test/fixtures/static',
      path: 'test/fixtures/static/absolute-path-index.html',
      contents: new Buffer(this.htmlFileContents('absolute-path-index'))
    });
    callback();
  });

};