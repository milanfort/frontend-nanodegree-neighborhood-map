var project = require('./package.json');
var del = require('del');
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cleanCss = require('gulp-clean-css');
var prefix = require('gulp-autoprefixer');
var htmlbuild = require('gulp-htmlbuild');
var htmlclean = require('gulp-htmlclean');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var browserify = require('browserify');
var vinylBuffer = require('vinyl-buffer');
var vinylSource = require('vinyl-source-stream');

var source = 'src';
var dest = 'dist';
var docs = 'docs';
var cssFile = 'main.min.css';

gulp.task('clean', function (done) {
    del([dest, docs], done);
});

gulp.task('css', function () {
    return gulp.src(source + '/css/*.css')
        .pipe(sourcemaps.init())
        .pipe(prefix({
            browsers: ['last 2 versions', '> 2%'],
            cascade: false
        }))
        .pipe(concat(cssFile))
        .pipe(cleanCss())
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest(dest + '/css/'))
        .pipe(browserSync.stream());
});

gulp.task('js', function () {
    return browserify({
        entries: source +'/js/main.js',
        debug: true
        }).bundle()
        .pipe(vinylSource('bundle.js'))
        .pipe(vinylBuffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest(dest + '/js/'))
        .pipe(browserSync.stream());
});

gulp.task('images', function () {
    return gulp.src(source + '/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest(dest + '/images/'))
        .pipe(browserSync.stream());
});

gulp.task('html', function () {
    return gulp.src(source + '/index.html')
        .pipe(htmlbuild({
            css: htmlbuild.preprocess.css(function (block) {
                block.write('css/' + cssFile);
                block.end();
            })
        }))
        .pipe(htmlclean())
        .pipe(gulp.dest(dest))
        .pipe(browserSync.stream());
});

gulp.task('default', ['css', 'js', 'images', 'html'], function () {
    console.log('Building %s version %s', project.name, project.version);
});

gulp.task('serve', ['default'], function () {
    console.log('Watching %s...', project.name);

    browserSync.init({
        server: './dist',
        online: false
    });

    //gulp.watch(source + '/**/*', browserSync.reload);
    gulp.watch(source + '/css/*.css', ['css']);
    gulp.watch(source + '/js/**/*.js', ['js']);
    gulp.watch(source + '/images/**/*', ['images']);
    gulp.watch(source + '/*.html', ['html']);
});
