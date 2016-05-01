var gulp = require('gulp');
var merge = require('merge-stream');
var path = require('path');

var pipeMaterialize = function () {
    // var materializeStream =
    //     gulp.src('../../src/js/vendors/materialize/materialize.min.js')
    //     .pipe(gulp.dest('../../dist/js/'));
        
    // var jqueryStream =
    //     gulp.src(require.resolve('jquery'))
    //     .pipe(gulp.dest('../../dist/js'));
        
    // return merge(materializeStream, jqueryStream);
    gulp.src(path.resolve(__dirname, '../../src/js/vendors/materialize/materialize.min.js'))
    .pipe(gulp.dest(path.resolve(__dirname, '../../dist/js/')));
    
    
    gulp.src(path.resolve(__dirname, require.resolve('jquery')))
    .pipe(gulp.dest(path.resolve(__dirname, '../../dist/js')));
}

module.exports = pipeMaterialize;
