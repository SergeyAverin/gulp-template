const { src, dest } = require('gulp');
const gulp = require('gulp');
const browserSync = require('browser-sync');

// plugins for html
const webpHTML = require('gulp-webp-html');
const version = require('gulp-version-number');
const fileinclude = require('gulp-file-include');

const plumber = require('gulp-plumber');
const notify = require("gulp-notify");



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
}

const build = gulp.series(gulp.parallel(html));
const watch = gulp.parallel(browserSyncInit, watchFiles, build);

exports.html = html;

exports.build = build;
exports.watch = watch;

exports.default = watch;
