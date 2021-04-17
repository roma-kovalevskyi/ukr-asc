const gulp = require('gulp');
const del = require('del');

const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");

const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');
const mode = require('gulp-mode')();
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

const jsFiles = [
    './src/assets/js/jquery.min.js',
    './src/assets/js/slick.min.js',
    './src/assets/js/jquery.nice-select.min.js',
    './src/assets/js/main.js'
]

function isMinJavaScript(file) {
    return !~file.basename.indexOf(".min");
}

function styles() {
    return gulp.src('./src/assets/css/**/style.scss')
        .pipe(mode.development(sourcemaps.init()))
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cleanCSS({ level: 2 }))
        .pipe(mode.development(sourcemaps.write()))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream());
}

function scripts() {
    return gulp.src(jsFiles)
        .pipe(mode.development(sourcemaps.init()))
        .pipe(mode.production(gulpif(isMinJavaScript, uglify({ toplevel: true }))))
        .pipe(concat('script.min.js'))
        .pipe(mode.development(sourcemaps.write()))
        .pipe(gulp.dest('./build/js'))
        .pipe(mode.development(browserSync.stream()));
}

function images() {
    return gulp.src('./src/assets/img/**/*')
        .pipe(mode.production(imagemin()))
        .pipe(gulp.dest('./build/img'))
        .pipe(mode.development(browserSync.stream()));
}

function html() {
    return gulp.src('./src/*.html')
        .pipe(gulp.dest('./build/'))
        .pipe(mode.development(browserSync.stream()));
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./build/"
        },
        tunnel: false
    });

    gulp.watch('./src/assets/css/**/*.scss', styles).on('change', browserSync.reload);
    gulp.watch('./src/assets/js/**/*.js', scripts);
    gulp.watch('./src/assets/img/**/*', images);
    gulp.watch('./src/*.html', html);
}

function clean() {
    return del(['build/*']);
}


gulp.task('watch', watch);

gulp.task('build', gulp.series(clean,
    gulp.parallel(styles, scripts, images, html)
));

gulp.task('dev', gulp.series('build', 'watch'));