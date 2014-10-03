'use strict';
var fs = require('fs');
var path = require('path');
var basePath = path.join(process.cwd(), 'test', 'fixtures', 'static');

var World = function World(callback) {

  this.indexFile = undefined;

  this.FILE_DECL = /(?:href=|src=|url\()['|"]([^\s>"']+?)\?rev=([^\s>"']+?)['|"]/gi;
  this.plugin = require('../../');
  this.htmlFileContents = function(filename) {
    return fs.readFileSync([basePath, filename + '.html'].join(path.sep));
  };
  callback();

};

module.exports.World = World;