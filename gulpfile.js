const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
const rollup = require('gulp-rollup');
const replace = require('rollup-plugin-replace');

// 开发环境
gulp.task('builddev', () => {
  return watch('./src/nodeuii/**/*.js', {
    ignoreInitial: false
  }, () => {
    gulp.src('./src/nodeuii/**/*.js')
      .pipe(babel({
        babelrc: false,
        'plugins': [
          'transform-es2015-modules-commonjs'
        ]
      }))
      .pipe(gulp.dest('./build/'))
  })
});

// babel + rolup 流清理
gulp.task('buildother', () => {
  gulp.src('./src/nodeuii/**/*.js')
      .pipe(babel({
        babelrc: false,
        'ignore': ['./src/nodeuii/app.js'],
        'plugins': [
          'transform-es2015-modules-commonjs'
        ]
      }))
      .pipe(gulp.dest('./build/'))
});

gulp.task('buildapp', () => {
  gulp.src('./src/nodeuii/**/*.js')
      .pipe(rollup({
        input: ['./src/nodeuii/app.js'],
        format: 'cjs',
        'plugins': [
          replace({
            'process.env.NODE_ENV': JSON.stringify('production')
          })
        ]
      }))
      .pipe(gulp.dest('./build/'))
});
console.log(process.env.NODE_ENV)
let _task = ['builddev'];

if (process.env.NODE_ENV === 'production') {
  _task = ['buildother', 'buildapp']
}

gulp.task('default', _task)
