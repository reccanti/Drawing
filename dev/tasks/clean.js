var gulp = require("gulp");
var clean = require("gulp-clean");

var path = require("path");

function cleanDirectory() {
    var cleanpath = path.resolve(__dirname, "../../build");
    return gulp.src(cleanpath, {read: false})
        .pipe(clean());
}

module.exports = cleanDirectory;