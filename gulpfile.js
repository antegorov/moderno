const { src, dest, watch, parallel, series } = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const del = require('del');
const cssmin = require('gulp-cssmin');


function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'app/'
        }
    });
};


function cleanDist() {
    return del('dist')
}

function images() {
    return src('app/images/**/*')
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({ quality: 75, progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .pipe(dest('dist/images'))
}

function styleSas() {
    return src([
            'app/scss/**/*.scss',
        ])
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(concat('style.min.css'))
        .pipe(cssmin())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 version'],
            grid: true
        }))
        .pipe(dest('app/css'))

    .pipe(browserSync.stream());

}

function styleLibs() {
    return src([
            'node_modules/slick-carousel/slick/slick.css',
            'node_modules/magnific-popup/dist/magnific-popup.css',
            'node_modules/normalize.css/normalize.css',
        ])
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(concat('libs.min.css'))
        .pipe(cssmin())
        .pipe(dest('app/css'))

    .pipe(browserSync.stream());
};

function scripts() {
    return src([
            'node_modules/slick-carousel/slick/slick.js',
            'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
            'node_modules/jquery/dist/jquery.js',
        ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js'))
        .pipe(browserSync.stream());

}

function build() {
    return src([
            'app/css/libs.min.css',
            'app/fonts/**/*',
            'app/js/libs.min.js',
            'app/*.html'
        ], { base: 'app' })
        .pipe(dest('dist'))
}

function watching() {
    watch(['app/scss/**/*.scss'], styleSas)
    watch(['app/js/**/*.js', '!app/js/libs.min.js'], scripts)
    watch(['app/*.html']).on('change', browserSync.reload);
};


exports.styleSas = styleSas;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.cleanDist = cleanDist;

exports.build = series(cleanDist, images, build);
exports.default = parallel(styleSas, scripts, styleLibs, browsersync, watching);