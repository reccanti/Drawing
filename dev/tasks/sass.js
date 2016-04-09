var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');

var path = require("path");


/**
 * Compile the sass into a 
 */
// function compileSass() {
//     var sasspath = path.resolve(__dirname, "../../app/client/sass/main.scss");
//     var csspath = path.resolve(__dirname, "../../build/client/css");
    
//     return gulp.src(sasspath + "/**/*.scss")
//         .pipe(plumber())
//         .pipe(sass())
//         .pipe(gulp.dest(csspath));
// }


function sassTask(src, dest) {
    var compileSass = function() {
        return gulp.src(src)
            .on('log', gutil.log)
            .pipe(plumber({
                errorHandler: function(err) {
                    gutil.beep();
                    console.log(err);
                }
            }))
            .pipe(sass())
            .pipe(gulp.dest(dest));
    }
    return compileSass;
}

module.exports = sassTask;