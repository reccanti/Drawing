var gulp = require("gulp");
var gutil = require('gulp-util');

// define the react task
var react = require("./dev/tasks/react");
reactTask = react(["src/js/components/container/route.jsx"], "dist/js/componentsbundle.js", true);

// styles
// var sassTask = require("./dev/tasks/sass");
var sass = require('./dev/tasks/sass');
sassTask = sass('src/sass/main.scss', 'dist/css/main.scss');

// scripts
gulp.task("watch-sass", [], function() {
    gulp.watch('src/sass/**/*.scss', sassTask)
        .on('change', function(evt) {
            gutil.log(evt);
        });
});


gulp.task("watch-react", [], reactTask);
gulp.task('watch', ['watch-sass', 'watch-react']);

gulp.task("default", ["sass"]);