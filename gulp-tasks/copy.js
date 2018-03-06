const gulp = require('gulp');
const path = require('path');

function copyTest() {
  return gulp.src(path.posix.join(__dirname, '..', 'test', 'static', '**', `*`))
  .pipe(gulp.dest(path.join(global.__buildConfig.temp, 'test', 'static')));
}

module.exports = {
  build: copyTest,
};
