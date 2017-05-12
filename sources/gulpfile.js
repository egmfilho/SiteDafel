'use strict';

const gulp = require('gulp');
const pug  = require('gulp-pug');
const sass = require('gulp-sass');
const del  = require('del');

var dest = '../public/';

gulp.task('clean', function () {
	return del([dest], { force: true });
});

gulp.task('views', function () {
	return gulp.src('./templates/pages/*.pug')
		.pipe(pug({ }))
		.pipe(gulp.dest(dest));
});

gulp.task('index', function () {
	return gulp.src('./index.pug')
		.pipe(pug({ }))
		.pipe(gulp.dest(dest));
});

gulp.task('compile-views', ['index', 'views']);

gulp.task('sass', function () {
	return gulp.src('./sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(dest + 'css'));
});

gulp.task('sass:watch', function () {
	return gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('copy-fonts', function () {
	return gulp.src('./fonts/*.*')
		.pipe(gulp.dest(dest + 'fonts'));
});

gulp.task('copy-images', function () {
	return gulp.src('./images/**/*.*')
		.pipe(gulp.dest(dest + 'images'));
});

gulp.task('copy-videos', function () {
	return gulp.src('./videos/**/*.*')
		.pipe(gulp.dest(dest + 'videos'));
});

gulp.task('copy-scripts', function () {
	return gulp.src('./js/*.js')
		.pipe(gulp.dest(dest + 'js'));	
});

gulp.task('copy-bat', function() {
	return gulp.src('./bat/**/*.*')
		.pipe(gulp.dest(dest + 'bat'));
});

gulp.task('copy-files', ['copy-scripts', 'copy-fonts', 'copy-images', 'copy-videos', 'copy-bat']);

gulp.task('default', ['compile-views', 'copy-files', 'sass']);

gulp.task('watch', ['sass:watch']);
