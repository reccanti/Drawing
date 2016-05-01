var gulp = require("gulp");
var gutil = require('gulp-util');

// define the react task
var react = require("./dev/tasks/react");
var materializeTask = require('./dev/tasks/materialize');
var reactTaskWatch = react(["src/js/components/container/route.jsx"], "dist/js/componentsbundle.js", true);
var reactTaskStatic = react(["src/js/components/container/route.jsx"], "dist/js/componentsbundle.js", false)

// var sassTask = require("./dev/tasks/sass");
var sass = require('./dev/tasks/sass');
sassTask = sass('src/sass/main.scss', 'dist/css');

// scripts
gulp.task("watch-sass", [], function() {
    gulp.watch('src/sass/**/*.scss', sassTask)
        .on('change', function(evt) {
            gutil.log(evt);
        });
});

gulp.task('fonts', [], function() {
    return gulp.src(['src/fonts/**/*.*'])
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('favicon', [], function () {
    return gulp.src(['./src/favicon.png'])
        .pipe(gulp.dest('./dist/'));
});

gulp.task('materialize', [], materializeTask);

gulp.task("watch-react", [], reactTaskWatch);
gulp.task("react",[], reactTaskStatic);
gulp.task('sass', [], sassTask);
gulp.task('build', ['react', 'sass', 'fonts', 'materialize', 'favicon']);

gulp.task('watch', ['watch-sass', 'watch-react', 'fonts', 'favicon']);

gulp.task("default", ["sass"]);