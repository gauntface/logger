const gulp = require('gulp');
const path = require('path');

const {buildTypescript} = require('./utils/build-typescript');

const tsconfig = path.join(__dirname, '..', 'tsconfigs', 'test-commonjs.json');

function build() {
  return buildTypescript(tsconfig, global.__buildConfig.temp, '.js');
}

build.displayName = `test-typescript`;

module.exports = {
  build,
};
