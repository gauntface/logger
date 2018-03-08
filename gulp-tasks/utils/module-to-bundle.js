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
const util = require('util');
const glob = util.promisify(require('glob'));

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

async function moduleToBundle(modulesDir, bundleDir) {
  await fs.remove(bundleDir);

  const moduleFiles = await glob('**/*.js', {
    cwd: modulesDir,
    absolute: true,
  });

  if (moduleFiles.length === 0) {
    return;
  }

  const buildFunctions = moduleFiles.map((moduleFile) => {
    const relativePath = path.relative(path.normalize(modulesDir), moduleFile);
    const cb = () => processScript(moduleFile, relativePath, bundleDir);
    cb.displayName = `moduleToBundle: ${relativePath}`;
    return cb;
  });

  return new Promise((resolve) => {
    gulp.parallel(buildFunctions)(resolve);
  });
};

module.exports = {moduleToBundle};
