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
  path = require("path");

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
    .pipe(livereload());
});

gulp.task('watch', function() {
  //gulp.watch(path.join(paths.sass, '**/*.scss'), [task]);
 
  // watch task for template changes
  gulp.watch(path.join('./dev/templates', '**/*.hbr'), ['handlebars']);
 
});

gulp.task('default', ['handlebars', 'connect', 'watch']);