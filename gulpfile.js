var project = require('./package.json');
var del = require('del');
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var cleanCss = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

var source = 'src';
var dest = 'dist';
var docs = 'docs';

gulp.task('clean', function (done) {
    del([dest, docs], done);
});

gulp.task('css', function () {
    return gulp.src(source + '/css/*.css')
        .pipe(sourcemaps.init())
        .pipe(cleanCss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dest + '/css/'))
        .pipe(browserSync.stream());
});

gulp.task('js', function () {
    return gulp.src(source + '/js/spa.js')
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dest + '/js/'))
        .pipe(browserSync.stream());
});

gulp.task('default', function () {
    console.log('Building %s version %s', project.name, project.version);

    browserSync.init({
        server: './src',
        online: false
    });

    //gulp.watch(source + '/**/*', browserSync.reload);
    gulp.watch(source + '/css/*.css', ['css']);
    gulp.watch(source + '/js/**/*.js', ['js']);
});
