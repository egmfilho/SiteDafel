'use strict';

const gulp 	     = require('gulp');
const gutil 	 = require('gulp-util');
const connect    = require('gulp-connect');
const rename 	 = require('gulp-rename');
const pug 	     = require('gulp-pug');
const sass       = require('gulp-sass');
const uglify     = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const concat     = require('gulp-concat');
const cssnano    = require('gulp-cssnano');

var source = ''; // removed ./ due the undetection of new/deleted files
var dest   = '../public/';

function error_handler(error) {
	// Output an error message
	gutil.log(gutil.colors.red('Error (' + error.plugin + '): ' + error.message));
	// emit the end event, to properly end the task
	this.emit('end');
}

gulp.task('connect', function() {
	connect.server({
		root: dest,
		port: 9000,
		livereload: 'true'
	});
});

gulp.task('compile-views', function() {
	return gulp.src(source + 'templates/pages/*.pug')
		.pipe(pug({ }).on('error', error_handler))
		.pipe(gulp.dest(dest))
		.pipe(connect.reload());
});

gulp.task('compile-sass', function() {
	return gulp.src(source + 'sass/**/*.scss')
		.pipe(sass().on('error', error_handler))
		.pipe(gulp.dest(dest + 'css'))
		.pipe(connect.reload());
});

gulp.task('app-bundle', function(cb) {
	return gulp.src(source + 'js/**/*.js')
		.pipe(gulp.dest(dest + 'js'))
		.pipe(connect.reload());
});

gulp.task('copy-images', function() {
	return gulp.src(source + 'images/**/*.{png,gif,jpg,jpeg}')
		.pipe(gulp.dest(dest + 'images'))
		.pipe(connect.reload());
});

gulp.task('copy-fonts', function() {	
	return gulp.src(source + 'fonts/**/*.*')
		.pipe(gulp.dest(dest + 'fonts'))
		.pipe(connect.reload());
});

gulp.task('copy-videos', function() {	
	return gulp.src(source + 'videos/**/*.{mp4,ogg,webm}')
		.pipe(gulp.dest(dest + 'videos'))
		.pipe(connect.reload());
});

gulp.task('copy-bat', function() {	
	return gulp.src(source + '/bat/**/*.*')
		.pipe(gulp.dest(dest + 'bat'))
		.pipe(connect.reload());
});

gulp.task('watch', function() {
	gulp.watch([source + 'templates/**/*.pug'], ['compile-views']);
	gulp.watch([source + 'styles/**/*.scss'], ['compile-sass']);
	gulp.watch([source + 'js/**/*.js'], ['app-bundle']);
	gulp.watch([source + 'images/**/*.*'], ['copy-images']);
	gulp.watch([source + 'fonts/**/*.*'], ['copy-fonts']);
	gulp.watch([source + 'videos/**/*.*'], ['copy-videos']);
	gulp.watch([source + 'strings.json'], ['copy-bat']);
});

gulp.task('default', ['connect', 'watch']);

gulp.task('build', ['compile-views', 'compile-sass', 'app-bundle', 'copy-images', 'copy-fonts', 'copy-videos', 'copy-bat']);

