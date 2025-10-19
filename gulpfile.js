const { src, dest, watch, parallel } = require('gulp');

const sass = require('gulp-dart-sass'),
	fileinclude = require('gulp-file-include'),
	cfg = require('./package.json').config,
	csso = require('gulp-csso'),
	concat = require('gulp-concat'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync').create(),
	terser = require('gulp-terser'),
	browserslist = ['> 1%, last 3 versions, not dead'];

// ===== HTML =====
function html() {
	return src([cfg.srcDir + '/*.html'])
		.pipe(
			fileinclude({
				prefix: '@@',
				basepath: '@file',
			})
		)
		.pipe(dest(cfg.outputDir))
		.pipe(browserSync.stream({ once: true }));
}

// ===== STYLES =====
function styles() {
	return src(cfg.srcDir + 'scss/**/*.{scss,sass}', { sourcemaps: true })
		.pipe(
			sass({
				outputStyle: 'expanded',
				silenceDeprecations: ['legacy-js-api'],
			}).on('error', sass.logError)
		)
		.pipe(
			autoprefixer({
				overrideBrowserslist: browserslist,
			})
		)
		.pipe(dest(cfg.outputDir + 'css', { sourcemaps: '.' }))
		.pipe(browserSync.stream({ once: true }));
}

// ===== MINIFIED STYLES =====
function stylesMin() {
	return src(cfg.srcDir + 'scss/**/*.{scss,sass}', { sourcemaps: false })
		.pipe(
			sass({
				outputStyle: 'compressed',
				silenceDeprecations: ['legacy-js-api'],
			}).on('error', sass.logError)
		)
		.pipe(
			autoprefixer({
				overrideBrowserslist: browserslist,
			})
		)
		.pipe(csso())
		.pipe(dest(cfg.outputDir + 'css'));
}

// ===== SCRIPTS =====
function scripts() {
	return src(cfg.srcDir + 'js/**/*.js')
		.pipe(concat('script.min.js'))
		.pipe(terser())
		.pipe(dest(cfg.outputDir + 'js'))
		.pipe(browserSync.stream({ once: true }));
}

// ===== IMAGES =====
function imageSync() {
	return src(cfg.srcDir + 'imgs/**/*', { encoding: false })
		.pipe(dest(cfg.outputDir + 'imgs'))
		.pipe(browserSync.stream({ once: true }));
}

// ===== BROWSER SYNC =====
function browsersync() {
	browserSync.init({
		server: {
			baseDir: cfg.outputDir,
		},
	});
}

// ===== WATCH =====
function watching() {
	watch([cfg.srcDir + 'scss/**/*.scss'], styles);
	watch([cfg.srcDir + 'js/**/*.js'], scripts);
	watch([cfg.srcDir + '/**/*.html'], html);
	watch([cfg.srcDir + 'imgs/**/*'], imageSync);
}

// ===== PRETTIER =====
async function loadPrettier() {
	const prettier = await import('gulp-prettier');
	return prettier.default;
}

async function pretty() {
	const prettier = await loadPrettier();
	return src(['src/**/*', '!src/imgs/**/*'])
		.pipe(prettier())
		.pipe(dest('src'));
}

// ===== EXPORT TASKS =====
exports.format = pretty;
exports.cssmin = stylesMin;
exports.default = parallel(html, styles, scripts, imageSync, watching, browsersync);
exports.build = parallel(html, stylesMin, scripts, imageSync);
