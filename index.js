var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var Buffer = require('buffer').Buffer;
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var map = require('event-stream').map;

var FILE_DECL = /(?:href="|src="|url\()(.*)[\?]rev=(.*)[\"\)]/gi;

var revPlugin = function revPlugin() {

  return map(function(file, cb) {

    var contents = file.contents.toString();
    var lines = contents.split('\n');
    var i, length = lines.length;
    var line;
    var groups;
    var dependencyPath;
    var data, hash;

    if(!file) {
      throw new PluginError('gulp-rev', 'Missing fileName option for gulp-rev.');
    }

    for(i = 0; i < length; i++) {
      line = lines[i];
      groups = FILE_DECL.exec(line);
      if(groups && groups.length > 1) {
        dependencyPath = path.resolve(path.dirname(file.path), groups[1]);
        try {
          data = fs.readFileSync(dependencyPath);
          hash = crypto.createHash('md5');
          hash.update(data.toString(), 'utf8');
          line = line.replace(groups[2], hash.digest('hex'));
        }
        catch(e) {
          // fail silently.
        }
      }
      lines[i] = line;
      FILE_DECL.lastIndex = 0;
    }

    file.contents = new Buffer(lines.join('\n'));
    cb(null, file);

  });

};

module.exports = revPlugin;