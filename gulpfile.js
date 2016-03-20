var gulp = require("gulp");
var react = require("./dev/tasks/react");

// styles
var sassTask = require("./dev/tasks/sass");

// clean
var cleanTask = require("./dev/tasks/clean");

// scripts

gulp.task("clean", cleanTask);
gulp.task("sass", sassTask);

gulp.task("default", ["clean", "sass"]);