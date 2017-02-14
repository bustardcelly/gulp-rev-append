gulp-rev-append
---
> gulp plugin for cache-busting files using query string file hash

[![Build Status](https://travis-ci.org/bustardcelly/gulp-rev-append.png?branch=master)](https://travis-ci.org/bustardcelly/gulp-rev-append)

installation
---
```
$ npm install gulp-rev-append --save-dev
```

how?
---
_gulpfile.js_
```
var rev = require('gulp-rev-append');

gulp.task('rev', function() {
  gulp.src('./index.html')
    .pipe(rev())
    .pipe(gulp.dest('.'));
});

```

_terminal_
```
$ gulp rev
```

what?
---
The [gulp-rev-append](https://github.com/bustardcelly/gulp-rev-append) plugins allows for appending a query-string file hash to dependencies declared in html files defined using the following regex: `(?:href|src)="(.*)[\?]rev=(.*)[\"]`

That's fancy talk for any stylesheet or script declarations that are declared in an html file such as the following:

```
<!doctype html>
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="style/style-one.css?rev=@@hash">
    <script src="script/script-one.js?rev=@@hash"></script>
    <script src="script/script-two.js"></script>
  </head>
  <body>
    <div><p>hello, world!</p></div>
    <script src="script/script-three.js?rev=@@hash"></script>
  </body>
</html>
```

will turn into something similar as the following after running `gulp-rev-append`:
```
<!doctype html>
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="style/style-one.css?rev=d65aaba987e9c1eefeb4be9cfd34e0de">
    <script src="script/script-one.js?rev=17a5da6c8a2d875cf48aefb722eefa07"></script>
    <script src="script/script-two.js"></script>
  </head>
  <body>
    <div><p>hello, world!</p></div>
    <script src="script/script-three.js?rev=5cadf43edba6a97980d42331f9fffd17"></script>
  </body>
</html>
```

Any subsequent runs of the `gulp-rev-append` file will change the output _only_ if the target file(s) declared have been modified. This is because the revision hash is computed using the target file contents.

The only requirement is that the dependency to be appended with the hash be declared using `?rev=`. The `@@hash` is not required, and any value will be overriden as the dependency file contents change.

why?
---
I wanted to easily define dependencies that require simple cache-busting by using a query-string hash. The hash is based on file content, so any modification to the file dependency would result in a change to the generated and appended hash - effectively cache-busting the dependency in simple scenarios.

__Be Warned__: Using query strings to cache-bust dependencies isn't fool proof. 

[Google | Leverage Proxy Cache Article](https://developers.google.com/speed/docs/best-practices/caching?csw=1#LeverageProxyCaching)  
[Steve Souders | Revving Filenames: don't use querystring](http://www.stevesouders.com/blog/2008/08/23/revving-filenames-dont-use-querystring/)

Other plugins that may work for your situation:
---
There are several gulp plugins that already support revisioning and cache-busting: [https://www.npmjs.org/search?q=gulp-rev](https://www.npmjs.org/search?q=gulp-rev)

I created this plugin as it fit my needs more clearly in:

* enabling cache-busting by appending a file hash on query string
* not requiring additionally markup commenting to declare dependencies to be modified
* not generating an additional manifest to be a dependency in file access for production-level application

For its particular use, I am not concerned with firewalls or proxy cache; I was trying to develop a simple web-based mobile site on a desktop while testing on devices and cache-ing was giving me a headache. I did not want to modify my workflow and build to accommodate an addition cache-manifest, nor did I foresee my work being in production in which I needed to support a more robust cache-busting technique.

If the intent of this plugin does not meet your needs, please checkout the other possible [solutions](https://www.npmjs.org/search?q=gulp-rev) made by some awesome developers.

Tests
---

```
$ npm run test
```

License
---
Copyright (c) 2014 Todd Anderson

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
