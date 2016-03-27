var gulp = require("gulp");
var react = require("./dev/tasks/react");

// styles
var sassTask = require("./dev/tasks/sass");

// scripts
gulp.task("sass", sassTask);

gulp.task("default", ["sass"]);