const gulp = require('gulp');
const path = require('path');

const {buildTypescript} = require('./utils/build-typescript');

const tsconfig = path.join(__dirname, '..', 'tsconfigs', 'browser-modules.json');

function build() {
  return buildTypescript(tsconfig, global.__buildConfig.dest, '.mjs');
}

build.displayName = `browser-typescript`;

module.exports = {
  build,
};
