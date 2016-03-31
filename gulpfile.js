var project = require('./package.json');
var del = require('del');
var gulp = require('gulp');
var browserSync = require('browser-sync').create();

var source = 'src';
var dest = 'dist';
var docs = 'docs';

gulp.task('clean', function (done) {
    del([dest, docs], done);
});

gulp.task('default', function () {
    console.log('Building %s version %s', project.name, project.version);

    browserSync.init({
        server: './src',
        online: false
    });

    gulp.watch(source + '/**/*', browserSync.reload);
});
