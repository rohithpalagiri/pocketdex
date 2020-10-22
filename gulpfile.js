const gulp = require('gulp');
const minify = require('gulp-minify');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const concat = require('gulp-concat');
var sass = require('gulp-sass');
const { src, series, parallel, dest, watch } = require('gulp');

const styleSRC = 'src/**/*.scss';
function css() {
    return src(styleSRC)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: ['node_modules']
        })
        .on('error', sass.logError))
        .pipe(concat('style.min.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('public'));
}

const devWatch = () => {
    watch(styleSRC, css)
}

exports.default = devWatch;