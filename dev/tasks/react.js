var gulp = require("gulp");
var source = require("vinyl-source-stream");
var browserify = require("browserify");
var reactify = require("reactify");
var streamify = require("gulp-streamify");
var uglify = require("gulp-uglify");
var watchify = require("watchify");
var buffer = require("vinyl-buffer");
var _ = require("lodash");
var gutil = require("gulp-util");


/**
 * Define the browserify object with options
 */
var opts = {
    entries: ["./src/js/components/container/route.jsx"],
    debug: true,
    fast: true,
    transform: [reactify],
    cache: {}
};
        

/**
 * This function takes all of our React components, and 
 * bundles them, returning them as standard, minified
 * JavaScript
 */        
var b = browserify(opts);
var browserifyBundle = function() {
    return b.bundle()
        .pipe(source("dist/js/componentsbundle.js"))
        // .pipe(streamify(uglify()))
        .pipe(gulp.dest("."));    
};
gulp.task('react', browserifyBundle);


/**
 * This function performs modified bundle, where it watches for changes
 */
var w = watchify(browserify(_.assign({}, watchify.args, opts)));
var watchifyBundle = function() {
    return w.bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source("dist/js/componentsbundle.js"))
        .pipe(buffer())
        .pipe(gulp.dest("."));
}
w.on("update", watchifyBundle);
w.on("log", gutil.log);
gulp.task('watch-react', watchifyBundle);