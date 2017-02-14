var chai = require('chai');
var expect = chai.expect;
var cheerio = require('cheerio');
var File = require('gulp-util').File;
var Buffer = require('buffer').Buffer;

module.exports = function() {
  'use strict';

  var result;

  this.World = require('../support/world').World;

  this.Given(/^I have declared a dependency in an html file with revision tokens$/, function (callback) {
    this.indexFile = new File({
      cwd: 'test/fixtures/',
      base: 'test/fixtures/static',
      path: 'test/fixtures/static/index.html',
      contents: new Buffer(this.htmlFileContents('index'))
    });
    callback();
  });

  this.Given(/^I have declared dependencies in an html file with revision tokens$/, function (callback) {
    this.indexFile = new File({
      cwd: 'test/fixtures/',
      base: 'test/fixtures/static',
      path: 'test/fixtures/static/multiple-index.html',
      contents: new Buffer(this.htmlFileContents('multiple-index'))
    });
    callback();
  });

  this.Given(/^I have declared an image dependency in an html file with revision tokens$/, function (callback) {
    this.indexFile = new File({
      cwd: 'test/fixtures/',
      base: 'test/fixtures/static',
      path: 'test/fixtures/static/image-element-post-class.html',
      contents: new Buffer(this.htmlFileContents('image-element-post-class'))
    });
    callback();
  });

  this.Given(/^I have declared dependencies in an html file with revision tokens$/, function (callback) {
    this.indexFile = new File({
      cwd: 'test/fixtures/',
      base: 'test/fixtures/static',
      path: 'test/fixtures/static/multiple-index.html',
      contents: new Buffer(this.htmlFileContents('multiple-index'))
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

  this.Then(/^The dependency is appended with a hash inline$/, function (callback) {
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

  this.Then(/^The dependencies are appended with a hash inline$/, function (callback) {
    var fileDeclarationRegex = this.FILE_DECL;
    var declarations = result.match(fileDeclarationRegex);
    // defined in test/fixtures/static/index.html
    console.log(result);
    expect(declarations.length).to.equal(3);
    for(var i = 0; i < declarations.length; i++) {
      // plugin should change @@hash to hash based on file contents
      expect(fileDeclarationRegex.exec(declarations[i])[2]).to.not.equal('@@hash');
      fileDeclarationRegex.lastIndex = 0;
    }
    callback();
  });

  this.Then(/^The attributes following the revision tokens are preserved$/, function (callback) {
    var $ = cheerio.load(result);
    var classDeclaration = $('img').attr('class');
    expect(classDeclaration).to.not.be.undefined;
    expect(classDeclaration).to.equal('pull-right company-logo media-object');
    callback();
  });

};