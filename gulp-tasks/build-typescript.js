const gulp = require('gulp');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const path = require('path');
const rename = require('gulp-rename');

function buildTypescript(tsConfigPath, destPath, extname) {
  const tsProject = ts.createProject(tsConfigPath);
  const errorMessages = [];
  const tsResult = tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .on('error', (err) => {
      if (global.__buildConfig.watching) {
        // Don't exit if we are watching - future changes may
        // fix the error.
        return;
      }

      errorMessages.push(err.message);
    });
  const jsStream = extname ? tsResult.js.pipe(rename({extname})) : tsResult.js;
  return jsStream.pipe(sourcemaps.write('.')).pipe(gulp.dest(destPath + '/'))
  .on('finish', () => {
    if (errorMessages.length > 0) {
      for (const msg of errorMessages) {
        console.error(msg);
      }
      process.exit(1);
    }
  });
};

function build(done) {
  return gulp.series(() => {
    const tsconfig = path.join(__dirname, '..', 'tsconfigs', 'es2015-modules.json');
    return buildTypescript(tsconfig, global.__buildConfig.dest, '.mjs;');
  })(done);
}

module.exports = {
  build,
};
