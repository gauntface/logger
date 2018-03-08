const gulp = require('gulp');
const path = require('path');
const fs = require('fs-extra');
const sourcemaps = require('gulp-sourcemaps');
const rollup = require('rollup');
const rollupStream = require('rollup-stream');
const uglifyPlugin = require('rollup-plugin-uglify');
const sourcemapPlugin = require('rollup-plugin-sourcemaps');
const esMinify = require('uglify-es').minify;
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

function processScript(moduleFile, relativePath, destDir) {
  return rollupStream({
    rollup,
    input: moduleFile,
    output: {
      format: 'iife',
      sourcemap: true,
      name: path.basename(moduleFile),
      name: 'hopin.logger',
    },
    plugins: [
      // This module enabled Rollup to *ingest* a sourcemap to apply
      // further manipulations
      sourcemapPlugin(),
      // Minify the bundled JS
      uglifyPlugin({}, esMinify),
    ],
  })
  .pipe(source(relativePath))
  // Convert streaming vinyl files to use buffers.
  // Required to make some of these gulp plugins work.
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(destDir));
};

async function moduleToBundle(moduleFile, bundleDir) {
  const relativePath = path.relative(path.dirname(moduleFile), moduleFile);
  const cb = () => processScript(moduleFile, relativePath, bundleDir);
  cb.displayName = `moduleToBundle: ${relativePath}`;

  return new Promise((resolve) => {
    gulp.series(cb)(resolve);
  });
};

module.exports = {moduleToBundle};
