var gulp = require("gulp");
var source = require("vinyl-source-stream");
var browserify = require("browserify");
var reactify = require("reactify");
var streamify = require("gulp-streamify");
var uglify = require("gulp-uglify");


/**
 * This function takes all of our React components, and 
 * bundles them, returning them as standard, minified
 * JavaScript
 */
gulp.task('react', function() {
    return browserify({
            entries: ["./src/js/components/canvas.jsx"],
            debug: true,
            transform: [reactify],
        })
        .bundle()
        .pipe(source("dist/js/componentsbundle.js"))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest("."))
});