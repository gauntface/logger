const gulp = require('gulp');
const path = require('path');
const fs = require('fs-extra');
const {setConfig} = require('@hopin/wbt-config');
const tsNode = require('@hopin/wbt-ts-node'); 
const tsBrowser = require('@hopin/wbt-ts-browser'); 
const clean = require('@hopin/wbt-clean'); 

const src = path.join(__dirname, 'src');
const dst = path.join(__dirname, 'build');

setConfig(src, dst);

const buildBrowserDir = path.join(__dirname, 'build-browser');
const buildNodeDir = path.join(__dirname, 'build-node');
const buildTestDir = path.join(__dirname, 'build-test');

gulp.task('clean',
  clean.gulpClean({
    dst,
  }, [
    buildBrowserDir,
    buildNodeDir,
    buildTestDir,
  ])
)

gulp.task('build',
  gulp.series(
    'clean',
    // Node build
    tsNode.gulpBuild({src: 'node', dst: buildNodeDir, rootDir: 'src'}),
    // Browser build
    tsBrowser.gulpBuild('hopin', {src: 'browser', dst: buildBrowserDir, rootDir: 'src'}),
    // Build all files for testing
    tsNode.gulpBuild({dst: buildTestDir, rootDir: 'src'}),
  )
);
