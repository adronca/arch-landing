const { src, dest, parallel, series, watch } = require('gulp');
const include = require('gulp-file-include');
const sync = require('browser-sync').create();
const del = require('del');
const sass = require('gulp-sass');

function html() {
	return src('src/html/**.html')
        .pipe(include({
            prefix: '@@'
        }))
	    .pipe(dest('dist'))
}

function scss() {
    return src('src/scss/**.scss')
        .pipe(sass())
        .pipe(dest('dist'))
}

function fonts() {
    return src('src/assets/fonts/**.ttf')
        .pipe(dest('dist/fonts'))
}

function svg() {
    return src('src/assets/svg/**.svg')
        .pipe(dest('dist/images/svg'))
}

function js() {
    return src('src/js/**.js')
        .pipe(dest('dist/js'))
}

function clear() {
    return del('dist');
}

function browserSync() {
    sync.init({
        server: './dist'
    })

    watch('src/html/**.html', series(html)).on('change', sync.reload)
    watch('src/scss/**.scss', series(scss)).on('change', sync.reload)
    watch('src/js/**.js', series(scss)).on('change', sync.reload)
}
exports.html = html;
exports.scss = scss;
exports.fonts = fonts;
exports.clear = clear;
exports.build = series(clear, scss, html, fonts, svg, js);
exports.serve = series(clear, scss, html, fonts, svg, js, browserSync);