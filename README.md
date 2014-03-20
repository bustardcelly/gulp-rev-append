gulp-rev-append
---
> gulp task to cache-busting files using file hash

installation
---
```
$ npm install gulp-rev-append --save-dev
```

usage
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
The [gulp-rev-append](https://github.com/bustardcelly/gulp-rev-append) task allows for appending a file hash to dependencies declared in html files defined using the following regex: `(?:href|src)="(.*)[\?]rev=(.*)[\"]`

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

Any subsequent runs of the `gulp-rev-append` file will change the output _only_ if the target file(s) delcared have changed. This is because the revision hash is computed using the target file contents.

The only requirement is that the dependency is declared with the appendage `?rev=`. `@@hash` is not required, and any value will be overriden as the dependency file contents change.
