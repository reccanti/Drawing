var gulp = require('gulp');
var merge = require('merge-stream');

var pipeMaterialize = function () {
    var materializeStream =
        gulp.src('../../src/js/vendors/materialize/materialize.min.js')
        .pipe(gulp.dest('../../dist/js/'));
        
    var jqueryStream =
        gulp.src(require.resolve('jquery'))
        .pipe(gulp.dest('../../dist/js'));
        
    return merge(materializeStream, jqueryStream);
}

module.exports = pipeMaterialize;
