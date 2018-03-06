const gulp = require('gulp');
const path = require('path');

const {buildTypescript} = require('./utils/build-typescript');

const tsconfig = path.join(__dirname, '..', 'tsconfigs', 'node-commonjs.json');

function build() {
  return buildTypescript(tsconfig, global.__buildConfig.dest, '.js');
}

build.displayName = `node-typescript`;

module.exports = {
  build,
};
