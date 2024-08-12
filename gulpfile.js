const { src, dest, watch, parallel } = require('gulp');

const scss = require('gulp-sass')(require('sass')),
	fileinclude = require('gulp-file-include'),
	cfg = require('./package.json').config,
	csso = require('gulp-csso'),
	concat = require('gulp-concat'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync').create(),
	terser = require('gulp-terser'),
	browserslist = ['> 1%, last 3 versions, not dead'];

const srcDir = 'src/',
	outputDir = 'app/',
	buildDir = 'buils/';

function html() {
	return src([srcDir + '/**/*.html'])
		.pipe(
			fileinclude({
				prefix: '@@',
				basepath: '@file',
			}),
		)
		.pipe(dest(outputDir));
}

function styles() {
	return src(srcDir + 'scss/**/*.{scss,sass}')
		.pipe(
			scss({
				errLogToConsole: true,
			}),
		)
		.on('error', scss.logError)
		.pipe(
			autoprefixer({
				overrideBrowserlist: browserslist,
			}),
		)
		.pipe(dest(outputDir + 'css'));
}

function scripts() {
	return src(srcDir + 'js/**/*.js')
		.pipe(concat('script.min.js'))
		.pipe(terser())
		.pipe(dest(outputDir + 'js'))

		.pipe(browserSync.stream());
}

function browsersync() {
	browserSync.init({
		server: {
			baseDir: outputDir,
		},
	});
}

function watching() {
	watch([srcDir + '/scss/**/*.scss'], styles).on('change', browserSync.reload);
	watch([srcDir + '/js/**/*.js'], scripts).on('change', browserSync.reload);
	watch([srcDir + '/**/*.html'], html).on('change', browserSync.reload);
}

exports.default = parallel(html, styles, scripts, watching, browsersync);
