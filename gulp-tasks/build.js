const gulp = require('gulp');
const fse = require('fs-extra');

const getTaskFilepaths = require('./utils/get-task-filepaths');

function cleanDestDir() {
  return fse.remove(global.__buildConfig.dest);
}

function cleanTempDir() {
  return fse.remove(global.__buildConfig.temp);
}

function build(done) {
  const parallelTasks = [];
  const postBuildTasks = [];
  const taskFiles = getTaskFilepaths();
  for (const taskFilepath of taskFiles) {
    const {build} = require(taskFilepath);
    if (build) {
      parallelTasks.push(build);
    }
  }

  const buildTasks = [
    cleanDestDir,
    cleanTempDir,
    gulp.parallel(parallelTasks),
  ];

  return gulp.series(buildTasks)(done);
}

module.exports = {
  task: build,
};
