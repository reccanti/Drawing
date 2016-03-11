var gulp = require("gulp");

var sassTask = require("./dev/tasks/sass");
var cleanTask = require("./dev/tasks/clean");

gulp.task("clean", cleanTask);
gulp.task("sass", sassTask);

gulp.task("default", ["clean", "sass"]);