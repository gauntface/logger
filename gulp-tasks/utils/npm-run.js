const path = require('path');
const spawn = require('./spawn-promise');

function npmRun(scriptName) {
  return spawn('npm', ['run', scriptName], {
    cwd: path.join(__dirname, '..', '..'),
    stdio: 'inherit',
  });
};

module.exports = {
  npmRun,
};
