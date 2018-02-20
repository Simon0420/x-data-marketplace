'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

// SCSS/CSS
var SCSS_SRC = './src/Assets/scss/**/*.scss';
var SCSS_DEST = './src/Assets/css';

gulp.task('sass', function () {
    return gulp.src(SCSS_SRC)
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest(SCSS_DEST));
});

gulp.task('sass:watch', function () {
    gulp.watch(SCSS_SRC, ['sass']);
});

// run task
gulp.task('default', ['sass:watch']);