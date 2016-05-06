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
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var a11y = require('gulp-a11y');
var mocha = require('gulp-mocha');
var jsdoc = require('gulp-jsdoc3');

var srcDir = 'src';
var testDir = 'test';
var destDir = 'dist';
var docsDir = 'docs';
var cssFile = 'main.min.css';

gulp.task('clean', function (done) {
    del([destDir, docsDir], done);
});

gulp.task('css', function () {
    return gulp.src([
            "node_modules/bootstrap/dist/css/bootstrap.css",
            srcDir + '/css/*.css'
        ])
        .pipe(sourcemaps.init())
        .pipe(prefix({
            browsers: ['last 2 versions', '> 2%'],
            cascade: false
        }))
        .pipe(concat(cssFile))
        .pipe(cleanCss())
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest(destDir + '/css/'))
        .pipe(browserSync.stream());
});

gulp.task('js', function () {
    return browserify({
        entries: srcDir +'/js/main.js',
        debug: true
        }).bundle()
        .pipe(vinylSource('bundle.js'))
        .pipe(vinylBuffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest(destDir + '/js/'))
        .pipe(browserSync.stream());
});

gulp.task('images', function () {
    return gulp.src(srcDir + '/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest(destDir + '/images/'))
        .pipe(browserSync.stream());
});

gulp.task('html', function () {
    return gulp.src(srcDir + '/index.html')
        .pipe(htmlbuild({
            css: htmlbuild.preprocess.css(function (block) {
                block.write('css/' + cssFile);
                block.end();
            })
        }))
        .pipe(htmlclean())
        .pipe(gulp.dest(destDir))
        .pipe(browserSync.stream());
});

gulp.task('a11y', function () {
    return gulp.src(srcDir + '/*.html')
        .pipe(a11y())
        .pipe(a11y.reporter());
});

gulp.task('lint', function () {
    return gulp.src(srcDir + '/js/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('style', function () {
    var filesToCheck = [
        srcDir + '/js/config.js',
        srcDir + '/js/util.js',
        srcDir + '/js/model.js',
        srcDir + '/js/logging.js',
        srcDir + '/js/viewModel.js'
    ];

    return gulp.src(filesToCheck)
        .pipe(jscs())
        .pipe(jscs.reporter());
});

gulp.task('test', function () {
    return gulp.src(testDir + '/*.js')
        .pipe(mocha());
});

gulp.task('validate', ['lint', 'style', 'a11y', 'test']);

gulp.task('docs', function (cb) {
    var config = require('./jsdoc.json');
    gulp.src([srcDir + '/js/**/*.js'], {read: false})
        .pipe(jsdoc(config, cb));
});

gulp.task('default', ['css', 'js', 'images', 'html'], function () {
    console.log('Building %s version %s', project.name, project.version);
});

gulp.task('serve', ['default'], function () {
    console.log('Watching %s...', project.name);

    browserSync.init({
        server: destDir,
        online: false
    });

    //gulp.watch(srcDir + '/**/*', browserSync.reload);
    gulp.watch(srcDir + '/css/*.css', ['css']);
    gulp.watch(srcDir + '/js/**/*.js', ['js', 'lint', 'style', 'test']);
    gulp.watch(srcDir + '/images/**/*', ['images']);
    gulp.watch(srcDir + '/*.html', ['html', 'a11y']);
});
