var configs = require('./configs.js'),
	gulp = require('gulp'),
	sass = require('gulp-sass'),
  handlebars = require('gulp-compile-handlebars'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  connect = require('gulp-connect'),
  livereload = require('gulp-livereload'),
  marked = require('gulp-marked'),
  frontmatter = require('gulp-front-matter'),
  lr = require('tiny-lr'),
  path = require("path"),
  server = lr();

gulp.task('connect', function(){
  connect.server({
    port: 1337,
    root: './build',
    livereload: false
  });
});

gulp.task('handlebars', function () {
  var templateData = configs.site,
      options = {
        ignorePartials: true,
        batch : ['./dev/templates/partials'],
        helpers : require('./helpers.js')
      };
  return gulp.src('./dev/templates/index.hbr')
    .pipe(handlebars(templateData, options))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('./build'))
    .pipe(livereload(server));
});

gulp.task('watch', function() {
  // Listen on port 35729
  server.listen(35729, function (err) {
    if (err) {
      return console.error(err) 
      //TODO use notify to log a message on Sass compile fail and Beep
    };
 
    //Watch task for sass
    //gulp.watch(path.join(paths.sass, '**/*.scss'), [task]);
 
    // watch task for gulp-includes
    gulp.watch(path.join('./dev/templates', '**/*.hbr'), ['handlebars']);
 
  });

});

gulp.task('default', ['handlebars', 'connect', 'watch']);