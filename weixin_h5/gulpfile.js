var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    jshint=require('gulp-jshint'),
    htmlmin = require('gulp-htmlmin'),
    es6 = require('gulp-babel');

    //语法检查
    gulp.task('jshint', function () {
        return gulp.src('js/*.js')
            .pipe(jshint())
            .pipe(jshint.reporter('default'));
    });

    //压缩html
    gulp.task('minifyhtml', function() {
        return gulp.src(['src/html/*.html'])    //需要操作的文件
            // .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
            .pipe(htmlmin({
                removeComments: true,
                collapseWhitespace: true,
                minifyJS: true,
                minifyCSS: true
            }))   //执行压缩
            .pipe(gulp.dest('./'));   //输出文件夹
    });

    //压缩css
    gulp.task('minifycss', function() {
        return gulp.src(['src/css/**/*.css'])    //需要操作的文件
            // .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
            .pipe(minifycss())   //执行压缩
            .pipe(gulp.dest('Css'));   //输出文件夹
    });

    //压缩,合并 js
    gulp.task('minifyjs', function() {
        return gulp.src(['src/js/**/*.js'])      //需要操作的文件
            // .pipe(concat('main.js'))    //合并所有js到main.js
            // .pipe(gulp.dest('js'))       //输出到文件夹
            // .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
            .pipe(es6())
            .pipe(uglify())    //压缩
            .pipe(gulp.dest('Js'));  //输出
    });

    //dev copy
    gulp.task('copyJs',  function() {
      return gulp.src(['src/js/**/*.js'])
      .pipe(gulp.dest('Js'));
    });
    gulp.task('copyCss',  function() {
      return gulp.src('src/css/**/*.css')
        .pipe(gulp.dest('Css'));
    });
    gulp.task('copyHtml',  function() {
      return gulp.src('src/html/*.html')
        .pipe(gulp.dest('./'));
    });

　　//build,在cmd中输入gulp后,执行的就是这个任务(压缩js需要在检查js之后操作)
    gulp.task('build',function() {
        gulp.start('minifycss','minifyjs','minifyhtml'); 
　　});

    //dev
//     gulp.task('dev',['jshint'],function() {
//         gulp.start('copyJs','copyCss'); 
// 　　});
    gulp.task('dev',function() {
        gulp.start('copyJs','copyCss','copyHtml'); 
　　});
