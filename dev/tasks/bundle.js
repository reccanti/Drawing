var browserify = require("browserify");
var fs = require('fs');
var path = require("path");

var b = browserify();
var f = fs.createWriteStream(path.resolve(__dirname, "../dist/js/bundle.js"));

b.add(path.resolve(__dirname, "../test/test1"));
b.bundle().pipe(f);

// function bundle(entry) {
//     return 
// }