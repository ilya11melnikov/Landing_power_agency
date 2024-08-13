const { src, dest, watch, parallel } = require('gulp');

const scss = require('gulp-sass')(require('sass')),
	fileinclude = require('gulp-file-include'),
	cfg = require('./package.json').config,
	csso = require('gulp-csso'),
	plumber = require('gulp-plumber'),
	concat = require('gulp-concat'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync').create(),
	terser = require('gulp-terser'),
	browserslist = ['> 1%, last 3 versions, not dead'];

function html() {
	return src([cfg.srcDir + '/**/*.html'])
		.pipe(
			fileinclude({
				prefix: '@@',
				basepath: '@file',
			}),
		)
		.pipe(dest(cfg.outputDir));
}

function styles() {
	return src(cfg.srcDir + 'scss/**/*.{scss,sass}', { sourcemaps: true })
		.pipe(plumber())
		.pipe(
			scss({
				errLogToConsole: true,
			}),
		)
		.pipe(
			autoprefixer({
				overrideBrowserslist: browserslist,
			}),
		)
		.pipe(csso())
		.pipe(dest(cfg.outputDir + 'css', { sourcemaps: '.'}));
}

function stylesMin() {
	return src(cfg.srcDir + '/**/*.{scss,sass}')
		.pipe(plumber())
		.pipe(
			scss({
				errLogToConsole: true,
			}),
		)
		.pipe(
			autoprefixer({
				overrideBrowserslist: browserslist,
			}),
		)
		.pipe(
			csso({
				restructure: false,
				comments: false,
			}),
		)
		.pipe(dest(cfg.buildDir + 'css'));
}

function scripts() {
	return src(cfg.srcDir + 'js/**/*.js')
		.pipe(concat('script.min.js'))
		.pipe(terser())
		.pipe(dest(cfg.outputDir + 'js'));
}

function imageSync() {
	return src('src/imgs/**/*', { encoding: false }).pipe(dest('app/imgs'));
}

function browsersync() {
	browserSync.init({
		server: {
			baseDir: cfg.outputDir,
		},
	});
}

function watching() {
	watch([cfg.srcDir + 'scss/**/*.scss'], styles).on('change', browserSync.reload);
	watch([cfg.srcDir + 'js/**/*.js'], scripts).on('change', browserSync.reload);
	watch([cfg.srcDir + '/**/*.html'], html).on('change', browserSync.reload);
	watch([cfg.srcDir + 'imgs/**/*'], html).on('change', browserSync.reload);
}

exports.build = parallel(stylesMin);
exports.default = parallel(html, styles, scripts, imageSync, watching, browsersync);
