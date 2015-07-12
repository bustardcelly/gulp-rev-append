var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var Buffer = require('buffer').Buffer;
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var map = require('event-stream').map;

var revPlugin = function revPlugin(params) {

    var defaultParams = {
        basePath: null,
        regExp: /(?:href=|src=|url\()['|"]([^\s>"']+?)\?rev=(@@hash)['|"]/gi
    };
    params = extend({}, defaultParams, params);

    function extend(target) {
        var sources = [].slice.call(arguments, 1);
        sources.forEach(function (source) {
            for (var prop in source) {
                target[prop] = source[prop];
            }
        });
        return target;
    }

    return map(function (file, cb) {
        var contents;
        var lines;
        var i, length;
        var line;
        var groups;
        var dependencyPath;
        var data, hash;

        if (!file) {
            throw new PluginError('gulp-rev-append', 'Missing file option for gulp-rev-append.');
        }

        if (!file.contents) {
            throw new PluginError('gulp-rev-append', 'Missing file.contents required for modifying files using gulp-rev-append.');
        }

        contents = file.contents.toString();
        lines = contents.split('\n');
        length = lines.length;

        for (i = 0; i < length; i++) {
            line = lines[i];
            groups = params.regExp.exec(line);
            if (groups && groups.length > 1) {
                // are we an "absoulte path"? (e.g. /js/app.js)
                var normPath = path.normalize(groups[1]);
                if (normPath.indexOf(path.sep) === 0) { //we have absolute path
                    if (params.basePath !== null) {
                        dependencyPath = path.join(params.basePath, normPath);
                    } else {
                        dependencyPath = path.join(file.base, normPath);
                    }
                }
                else {
                    dependencyPath = path.resolve(path.dirname(file.path), normPath);
                }

                try {
                    data = fs.readFileSync(dependencyPath);
                    hash = crypto.createHash('md5');
                    hash.update(data.toString(), 'utf8');
                    line = line.replace(groups[2], hash.digest('hex'));
                } catch (e) {
                    // fail silently.
                }
            }
            lines[i] = line;
            params.regExp.lastIndex = 0;
        }

        file.contents = new Buffer(lines.join('\n'));
        cb(null, file);

    });

};

module.exports = revPlugin;
