const gulp = require('gulp');
const path = require('path');

const getTaskFilepaths = require('./gulp-tasks/utils/get-task-filepaths');

global.__buildConfig = {
  src: path.join(__dirname, 'src'),
  dest: path.join(__dirname, 'dist'),
  temp: path.join(__dirname, 'build'),
};

const loadTasks = () => {
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
});
