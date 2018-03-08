const {npmRun} = require('./utils/npm-run');

async function build() {
  await npmRun('typescript:test');
}

build.displayName = `typescript-test`;

module.exports = {
  build,
};
