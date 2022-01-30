const { src, dest } = require('gulp');
const gulp = require('gulp');
const browserSync = require('browser-sync');

// plugins for html
const webpHTML = require('gulp-webp-html');
const version = require('gulp-version-number');
const fileinclude = require('gulp-file-include');

// plugins for css
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const webpCss = require('gulp-webp-css');
const gcmq = require('gulp-group-css-media-queries');

const plumber = require('gulp-plumber');
const notify = require("gulp-notify");
const rename = require('gulp-rename');
const del = require('del');


const buildFolder = 'dist';
const sourceFolder = 'src';

const path = {
  build: {
    html: `${buildFolder}/`,
    css: `${buildFolder}/css/`,
    js: `${buildFolder}/js/`,
    img: `${buildFolder}/img/`,
    font: `${buildFolder}/fonts/`,
    files: `${buildFolder}/files/`
  },
  src: {
    html: `${sourceFolder}/*.html`,
    sass: `${sourceFolder}/sass/style.sass`,
    js: `${sourceFolder}/js/script.js`,
    img: `${sourceFolder}/img/**/*.{png, jpg, svg, gif, ico, webp}`,
    font: `${sourceFolder}/fonts/*.ttf`,
    files: `${sourceFolder}/files/**/*.*`
  },
  watch: {
    html: `${sourceFolder}/**/*.html`,
    sass: `${sourceFolder}/sass/**/*.sass`,
    js: `${sourceFolder}/js/**/*.js`,
    img: `${sourceFolder}/img/**/*.{png, jpg, svg, gif, ico, webp}`,
    font: `${sourceFolder}/fonts/*.ttf`,
    files: `${sourceFolder}/files/**/*.*`
  },
  clean: `./${buildFolder}/`,
};

function html() {
  return src(path.src.html)
    /*
    .pipe(plumber(
      {errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    */
    .pipe(fileinclude())
    .pipe(webpHTML())
    .pipe(version(
    {
        'value' : '%DT%',
        'append' : {
            'key' : '_v',
            'cover' : 0,
            'to' : [
                'css',
                'js'
            ]
        },
        'output' : {
            'file' : `${buildFolder}/version.json`
        }
    }))
    .pipe(dest(path.build.html))
    .pipe(browserSync.stream());
}

function css() {
  return src(path.src.sass, {sourcemaps: true})
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(gcmq())
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 5 versions'],
      cascade: true,
    }))
    .pipe(webpCss())
    .pipe(dest(path.build.css))
    .pipe(cleancss())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(dest(path.build.css))
    .pipe(browserSync.stream());
}

function files() {
  return src(path.src.files)
    .pipe(dest(path.build.files))
}

function browserSyncInit() {
  browserSync.init({
    server: {
      baseDir: `./${buildFolder}/`,
    },
    port: 3333,
    notify: false,
    open: false,
  });
}

function watchFiles() {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.sass], css);
  gulp.watch([path.watch.files], files;
}

function clean() {
  return del(path.clean);
}

const build = gulp.series(clean, gulp.parallel(html, css, files));
const watch = gulp.parallel(browserSyncInit, watchFiles, build);

exports.html = html;
exports.css = css;
exports.files = files;

exports.build = build;
exports.watch = watch;
exports.clean = clean;

exports.default = watch;
