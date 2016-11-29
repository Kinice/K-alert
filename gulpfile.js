var gulp = require('gulp'),
    less = require('gulp-less'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync').create(),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    reload = browserSync.reload;


gulp.task('less', function(){
    gulp.src('public/style/*.less')
        .pipe(less())
        .pipe(minifycss())
        .pipe(gulp.dest('k-alert'));
});
gulp.task('script', function(){
    gulp.src('public/script/*.js')
        .pipe(rename({suffix:'.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('k-alert'));
});

gulp.task('browser-sync',['script','less'],function(){
    browserSync.init({
        server:{
            baseDir: './'
        }
    });
    gulp.watch('public/style/*.less',['less']);
    gulp.watch('public/script/*.js',['script']);
    gulp.watch('k-alert/*.css').on('change',reload);
    gulp.watch('k-alert/*.js').on('change',reload);
    gulp.watch('*.html').on('change',reload);
});
gulp.task('default',['browser-sync'], function(){
    console.log('Mission Complete');
});
