const gulp = require('gulp');
const path = require('path');
const {setConfig} = require('@hopin/wbt-config');
const tsNode = require('@hopin/wbt-ts-node'); 
const tsBrowser = require('@hopin/wbt-ts-browser'); 

const getTaskFilepaths = require('./gulp-tasks/utils/get-task-filepaths');

const src = path.join(__dirname, 'src');
const dst = path.join(__dirname, 'build');

setConfig(src, dst);

/* global.__buildConfig = {
  src: path.join(__dirname, 'src'),
  dest: path.join(__dirname, 'dist'),
  temp: path.join(__dirname, 'build'),
};*/

/* const loadTasks = () => {
  const taskFiles = getTaskFilepaths();
  for (const taskFilepath of taskFiles) {
    const {task} = require(taskFilepath);
    if (task) {
      gulp.task(task);
    }
  }
};

loadTasks();

gulp.task('dev', (done) => {
  return gulp.series([
    'build',
  ])(done);
});

gulp.task('prod', (done) => {
  process.env.NODE_ENV = 'production';

  return gulp.series([
    'build',
  ])(done);
});*/

gulp.task('build',
  gulp.series(
    tsBrowser.gulpBuild('hopin', 'browser'),
    // The order of this is important.
    tsNode.gulpBuild('node'),
  )
);
