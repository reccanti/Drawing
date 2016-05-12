/**
 * Describes methods for uploading and generating files via
 * GridFS
 */
var Grid = require('gridfs-stream');
var mongoose = require('mongoose');
var config = require('../config');
var fs = require('fs');
var short = require('shortid');
// var base64 = require('base64-stream');

var conn = mongoose.createConnection(config.dbURL);
var gfs;
// var getFileById;


/**
 * Open the GridFS connection
 */
conn.once('open', function () {
    Grid.mongo = mongoose.mongo;
    gfs = Grid(conn.db);
});


/**
 * Upload a file to MongoDB via GridFS
 */
function upload(filePath, callback) {
    var inStream;
    var outStream;

    // get the file extension
    // var ext = req.files.file.path.split(/[. ]+/).pop();

    /* eslint no-console: 0 */
    console.log(filePath);
    inStream = fs.createReadStream(filePath);
    outStream = gfs.createWriteStream({ filename: short.generate() + '.png' });
    inStream.pipe(outStream);

    outStream.on('close', function (file) {
        callback(file);
        // fs.unlink(req.files.file.path, function () {
        //     res.json(200, file);
        // });
    });
}


/**
 * Given a DataURL, convert it to a file and upload it
 */
function uploadDataURL(url, callback) {
    var imgBuff = new Buffer(url, 'base64');
    /* eslint no-console: 0 */
    console.log(imgBuff);
    fs.writeFile('/temp/temp.png', imgBuff, 'base64', function (err) {
        if (!err) {
            upload('/temp/temp.png', callback);
        } else {
            throw Error(err);
        }
    });
}

module.exports.uploadDataURL = uploadDataURL;
module.exports.upload = upload;
