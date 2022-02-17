const { src, dest } = require("gulp");
const gulp = require("gulp");
const browserSync = require("browser-sync");

// plugins for html
//const webpHTML = require('gulp-webp-html');
const webpHTML = require("gulp-webp-html-nosvg");
const version = require("gulp-version-number");
const fileinclude = require("gulp-file-include");

// plugins for js
const webpack = require("webpack-stream");

// plugins for css
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const cleancss = require("gulp-clean-css");
const webpCss = require("gulp-webp-css");
const gcmq = require("gulp-group-css-media-queries");

// plugins for images
const webp = require("gulp-webp");
const newer = require("gulp-newer");

// Plugins for fonts
const ttf2woff = require("gulp-ttf2woff");
const ttf2woff2 = require("gulp-ttf2woff2");

// Other gulp plugins
const rename = require("gulp-rename");
const gulpif = require("gulp-if");
const del = require("del");

const isBuild = false;
const buildFolder = "dist";
const sourceFolder = "src";

const path = {
  build: {
    html: `${buildFolder}/`,
    css: `${buildFolder}/css/`,
    js: `${buildFolder}/js/`,
    img: `${buildFolder}/img/`,
    fonts: `${buildFolder}/fonts/`,
    files: `${buildFolder}/files/`,
  },
  src: {
    html: `${sourceFolder}/*.html`,
    sass: `${sourceFolder}/sass/style.sass`,
    js: `${sourceFolder}/js/script.js`,
    img: `${sourceFolder}/img/**/*.{png, jpg, jpeg, svg, gif, ico, webp}`,
    fonts: `${sourceFolder}/fonts/*.ttf`,
    files: `${sourceFolder}/files/**/*.*`,
  },
  watch: {
    html: `${sourceFolder}/**/*.html`,
    sass: `${sourceFolder}/sass/**/*.sass`,
    js: `${sourceFolder}/js/**/*.js`,
    img: `${sourceFolder}/img/**/*.{png, jpg, jpeg, svg, gif, ico, webp}`,
    files: `${sourceFolder}/files/**/*.*`,
  },
  clean: `./${buildFolder}/`,
};

function html() {
  return src(path.src.html)
    .pipe(fileinclude())
    .pipe(gulpif(isBuild, webpHTML()))
    .pipe(
      gulpif(
        isBuild,
        version({
          value: "%DT%",
          append: {
            key: "_v",
            cover: 0,
            to: ["css", "js"],
          },
          output: {
            file: `${buildFolder}/version.json`,
          },
        })
      )
    )
    .pipe(dest(path.build.html))
    .pipe(browserSync.stream());
}

function css() {
  return src(path.src.sass, { sourcemaps: true })
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(gulpif(isBuild, gcmq()))
    .pipe(
      gulpif(
        isBuild,
        autoprefixer({
          overrideBrowserslist: ["last 5 versions"],
          cascade: true,
        })
      )
    )
    .pipe(gulpif(isBuild, webpCss()))
    .pipe(dest(path.build.css))
    .pipe(cleancss())
    .pipe(rename({ extname: ".min.css" }))
    .pipe(dest(path.build.css))
    .pipe(browserSync.stream());
}

function js() {
  return src(path.src.js, { sourcemaps: true })
    .pipe(webpack(require("./webpack.config.js")))
    .pipe(dest(path.build.js))
    .pipe(browserSync.stream());
}

function files() {
  return src(path.src.files).pipe(dest(path.build.files));
}

function img() {
  return src(path.src.img)
    .pipe(newer(path.src.img))
    .pipe(dest(path.build.img))
    .pipe(gulpif(isBuild, webp()))
    .pipe(dest(path.build.img));
}

function fonts() {
  src(path.src.fonts).pipe(ttf2woff()).pipe(dest(path.build.fonts));
  return src(path.src.fonts).pipe(ttf2woff2()).pipe(dest(path.build.fonts));
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
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.img], img);
}

function clean() {
  return del(path.clean);
}

const build = gulp.series(
  clean,
  gulp.parallel(html, css, js, files, img, fonts)
);
const watch = gulp.parallel(browserSyncInit, watchFiles, build);

exports.html = html;
exports.css = css;
exports.js = js;
exports.img = img;
exports.files = files;
exports.fonts = fonts;

exports.build = build;
exports.watch = watch;
exports.clean = clean;

exports.default = watch;
