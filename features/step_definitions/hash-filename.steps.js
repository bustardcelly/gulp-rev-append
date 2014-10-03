var chai = require('chai');
var expect = chai.expect;
var File = require('gulp-util').File;
var Buffer = require('buffer').Buffer;

module.exports = function() {
  'use strict';

  var result;

  this.World = require('../support/world').World;

  this.Given(/^I have declared dependencies in an html file with revision tokens$/, function (callback) {
    this.indexFile = new File({
      cwd: 'test/fixtures/',
      base: 'test/fixtures/static',
      path: 'test/fixtures/static/index.html',
      contents: new Buffer(this.htmlFileContents('index'))
    });
    callback();
  });

  this.When(/^I invoke the gulp\-rev\-append plugin$/, function (callback) {
    var revver = this.plugin();
    revver.on('data', function(data) {
      result = data.contents.toString();
      callback();
    });
    revver.write(this.indexFile);
  });

  this.Then(/^The depencies are appended with a hash inline$/, function (callback) {
    var fileDeclarationRegex = this.FILE_DECL;
    var declarations = result.match(fileDeclarationRegex);
    // defined in test/fixtures/static/index.html
    expect(declarations.length).to.equal(3);
    for(var i = 0; i < declarations.length; i++) {
      // plugin should change @@hash to hash based on file contents
      expect(fileDeclarationRegex.exec(declarations[i])[2]).to.not.equal('@@hash');
      fileDeclarationRegex.lastIndex = 0;
    }
    callback();
  });

};