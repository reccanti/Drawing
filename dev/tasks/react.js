var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var watchify = require('watchify');
var buffer = require('vinyl-buffer');
var _ = require('lodash');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');


/**
 * This function defines a browserify task. It accepts
 * an array of sources, the final destination, and whether
 * or not to watch the file
 */
var browserifyTask = function(src, dest, watch) {
    var opts = {
        entries: src,
        debug: true,
        fast: true,
        transform: [reactify],
        cache: {}
    };
    
    // define the bundler. If watch is true, set to 
    // wrap the bundler in a watchify function.
    var bundler;
    if (watch) {
        opts = _.assign({}, watchify.args, opts);
        bundler = watchify(browserify(opts));
    } else {
        bundler = browserify(opts);
    }
    
    // define a rebundle function to be called on updates
    var rebundle = function() {
        return bundler.bundle()
            .on('error', gutil.log.bind(gutil, 'Browserify Error'))
            .pipe(source(dest))
            .pipe(buffer())
            .pipe(uglify())
            .pipe(gulp.dest('.'));
    };
    bundler.on('update', rebundle);
    bundler.on('log', gutil.log);
    return rebundle;
};
module.exports = browserifyTask;