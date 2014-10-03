var configs = require('./configs.js'),
	gulp = require('gulp'),
	sass = require('gulp-sass'),
  handlebars = require('gulp-compile-handlebars'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  connect = require('gulp-connect'),
  livereload = require('gulp-livereload'),
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
  var templateData = {
      firstName: 'Tom'
  },
  options = {
    ignorePartials: true, //ignores the unknown footer2 partial in the handlebars template, defaults to false
    partials : {
      footer : '<footer>the end</footer>'
    },
    batch : ['./dev/templates/partials'],
    helpers : {
      capitals : function(str){
        return str.toUpperCase();
      }
    }
  }  
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