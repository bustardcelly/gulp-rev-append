'use strict';
var fs = require('fs');
var path = require('path');
var basePath = path.join(process.cwd(), 'test', 'fixtures', 'static');
var indexPath = [basePath, 'index.html'].join(path.sep);

var World = function World(callback) {

  this.indexFile = undefined;

  this.plugin = require('../../');
  this.htmlFileContents = '';
  (function(world) {
    fs.readFile(indexPath, function(err, data) {
      world.htmlFileContents = data.toString();
      callback();
    });
  }(this));

};

module.exports.World = World;