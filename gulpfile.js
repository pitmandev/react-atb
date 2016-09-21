const gulp = require('gulp');
const babel = require('gulp-babel');

var jsx = require('gulp-jsx');

gulp.task('build', function() {
  return gulp.src('scripts/**/*.js')
    .pipe(gulp.dest('dist'));
});
