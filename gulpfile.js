
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
