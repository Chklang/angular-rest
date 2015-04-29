var gulp = require('gulp');
var del = require('del');
var minify = require('gulp-minify');
var minifyCSS = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var wrap = require('gulp-wrap');
var header = require('gulp-header');

gulp.task('clean', function (cb) {
	del([
	     'temp',
	     'dist',
	   ], cb);
});

gulp.task('lint',function(){
	return gulp.src('src/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(jshint.reporter('fail'));
}); // end lint

gulp.task('concat-js',function(){
	return gulp.src(['src/rest-main.js','src/rest-service.js'])
		.pipe(concat('rest.js'))
		.pipe(wrap('(function(){\n<%= contents %>\n})();'))
		.pipe(gulp.dest('.tmp'));
}); // end concat-js

gulp.task('compress-js',['concat-js'],function(){
	var bower = require('./bower.json');
	var banner = ['/**',
		' * <%= bower.name %> - <%= bower.description %>',
		' * @version v<%= bower.version %>',
		' * @author <%= bower.authors[0].name %>, <%= bower.authors[0].email %>',
		' * @license <%= bower.licenses[0].type %>, <%= bower.licenses[0].url %>',
		' */',
		''].join('\n');

	gulp.src(['.tmp/rest.js'])
		.pipe(header(banner, {bower : bower}))
		.pipe(minify({}))
		.pipe(gulp.dest('dist'));
			
}); // end comrpess-js

gulp.task('default',['clean', 'lint','compress-js']);