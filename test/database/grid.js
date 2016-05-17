// var Grid = require('../../server/models/Grid');
// // var fs = require('fs');

// var mongoose = require('mongoose');
// var dbURL = 'mongodb://localhost/Drawing-Test';
// // var chai = require('chai');
// var firstImage = require('./dataURL').first;
// // var secondImage = require('./dataURL').second;

// mongoose.createConnection(dbURL);
// describe('Tests the GridFS module', function () {
//     /**
//      * Before each test, clear the database
//      */
//     beforeEach(function (done) {
//         function clearDB() {
//             var i;
//             for (i in mongoose.connection.collections) {
//                 if (mongoose.connection.collections.hasOwnProperty(i)) {
//                     mongoose.connection.collections[i].remove(function () { });
//                 }
//             }
//             return done();
//         }
//         if (mongoose.connection.readyState === 0) {
//             mongoose.createConnection(dbURL, function (err) {
//                 if (err) {
//                     throw err;
//                 }
//                 return clearDB();
//             });
//         } else {
//             return clearDB();
//         }
//         return 0;
//     });

//     /**
//      * After each test, close the mongodb connection
//      */
//     afterEach(function (done) {
//         mongoose.connection.close();
//         return done();
//     });

//     /* eslint no-spaced-func: 0 */
//     /* eslint space-before-function-paren: 0 */
//     describe('GridFS tests', function () {
//         it ('tests that a file can be uploaded to the database', function(done) {
//             var imgString = firstImage.replace('data:image/png;base64,', '');
//             Grid.uploadDataURL(imgString, function () {
//                 done();
//             });
//         });
//     });
// });
