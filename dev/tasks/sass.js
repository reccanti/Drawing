var gulp = require("gulp");
var sass = require("gulp-sass");

var path = require("path");

function compileSass() {
    var sasspath = path.resolve(__dirname, "../../app/client/sass/main.scss");
    var csspath = path.resolve(__dirname, "../../build/client/css");
    
    return gulp.src(sasspath + "/**/*.scss")
        .pipe(sass())
        .pipe(gulp.dest(csspath));
}

module.exports = compileSass;