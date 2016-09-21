const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('build', function() {
  return gulp.src('scripts/**/*.js')
    .pipe(gulp.dest('dist'));
});
