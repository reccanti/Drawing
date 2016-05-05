var app = require('../app');
var Grid = require('gridfs-stream');
var mongoose = require('mongoose');
var config = require('../config');
var fs = require('fs');
var short = require('shortid');

var conn = mongoose.createConnection(config.dbURL);
var gfs;
conn.once('open', function() {
    gfs = Grid(conn.db);
});

/**
 * Upload a file to the database using gridfs
 */
var upload = function (req, res, next) {
    var inStream;
    var outStream;
    
    // get the file extension
    var extension = req.files.file.path.split(/[. ]+/).pop();
    
    inStream = fs.createReadStream(req.files.file.path);
    outStream = gfs.createWriteStream({filename: short.generate() + '.' + ext});
    inStream.pipe(outStream);
    
    outStream.on('close', function (file) {
        fs.unlink(req.files.file.path, function() {
          res.json(200, file);
        });
    });
};

/** 
 * retrieve a gridfs file by its id
 */
var getFileById = function (req, res, next) {
    var readstream = gridfs.createReadStream({
        _id: req.params.fileId
    });
    req.on('error', function(err) {
        res.send(500, err);
    });
    readstream.on('error', function (err) {
        res.send(500, err);
    });
    readstream.pipe(res);
}

module.exports.upload = upload;
module.exports.getFileById = getFileById;