const {npmRun} = require('./utils/npm-run');

async function build() {
  await npmRun('typescript:commonjs');
}

build.displayName = `typescript-commonjs`;

module.exports = {
  build,
};
