// var app = require('../app');
var Grid = require('gridfs-stream');
var mongoose = require('mongoose');
var config = require('../config');
var fs = require('fs');
var short = require('shortid');

var conn = mongoose.createConnection(config.dbURL);
var gfs;
var upload;
var getFileById;

conn.once('open', function () {
    gfs = Grid(conn.db);
});

/**
 * Upload a file to the database using gridfs
 */
upload = function (req, res) {
    var inStream;
    var outStream;

    // get the file extension
    var ext = req.files.file.path.split(/[. ]+/).pop();

    inStream = fs.createReadStream(req.files.file.path);
    outStream = gfs.createWriteStream({ filename: short.generate() + '.' + ext });
    inStream.pipe(outStream);

    outStream.on('close', function (file) {
        fs.unlink(req.files.file.path, function () {
            res.json(200, file);
        });
    });
};

/**
 * retrieve a gridfs file by its id
 */
getFileById = function (req, res) {
    var readstream = gfs.createReadStream({
        _id: req.params.fileId,
    });
    req.on('error', function (err) {
        res.send(500, err);
    });
    readstream.on('error', function (err) {
        res.send(500, err);
    });
    readstream.pipe(res);
};

module.exports.upload = upload;
module.exports.getFileById = getFileById;
