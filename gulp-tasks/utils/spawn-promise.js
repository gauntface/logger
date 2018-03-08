const spawn = require('child_process').spawn;

function promiseSpawn(cmd, args, opts) {
  const process = spawn(cmd, args, opts);
  const newPromise = new Promise((resolve, reject) => {
    process.on('error', reject);
    process.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(`Error ${code} returned from ${cmd} ${args}`);
      }
    });
  });

  // This is a nasty hack to allow a projest to kill
  // the process if needed.
  newPromise.process = process;

  return newPromise;
};

module.exports = promiseSpawn;
