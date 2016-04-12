var mongoose = require('mongoose');
var dbURL = 'mongodb://localhost/Drawing-Test';
var DrawingModel = require('../../server/models/Drawing');
var chai = require('chai');
var testDataURL1 = require('./dataURL.js').first;
var testDataURL2 = require('./dataURL.js').second;

mongoose.createConnection(dbURL);
// describe('Static tests for the Drawing model', function () {
//     it('checks that the Model generates a hash value', function (done) {
//         UserModel.Model.generateHash('test password', function (salt, hash) {
//             chai.expect(salt).not.to.be.a('string');
//             chai.expect(hash).to.be.a('string');
//             done();
//         });
//     });
//     it('is connected to the database', function (done) {
//         chai.expect(mongoose.connection.db).to.not.be.undefined;
//         done();
//     });
// });


describe('Tests the Drawing model', function () {
    beforeEach(function (done) {
        function clearDB() {
            var i;
            for (i in mongoose.connection.collections) {
                if (mongoose.connection.collections.hasOwnProperty(i)) {
                    mongoose.connection.collections[i].remove(function () { });
                }
            }
            return done();
        }
        if (mongoose.connection.readyState === 0) {
            mongoose.createConnection(dbURL, function (err) {
                if (err) {
                    throw err;
                }
                return clearDB();
            });
        } else {
            return clearDB();
        }
        return 0;
    });


    afterEach(function (done) {
        mongoose.connection.close();
        return done();
    });


    it('Saves a User with the correct information', function (done) {
        var saveData = {
            owner: 1,
            image: testDataURL1,
        };
        var drawing = new DrawingModel.Model(saveData);
        chai.expect(drawing.save).not.to.throw(Error);
        done();
    });


    it('Gets the correct information from toAPI', function (done) {
        var saveData = {
            owner: 1,
            image: testDataURL1,
        };
        var drawing = new DrawingModel.Model(saveData);
        var api = drawing.toAPI();
        drawing.save();
        chai.expect(api.image.toString()).to.eql(testDataURL1);
        chai.expect(api.createdDate).to.be.a('Date');
        done();
    });


    it('fetches all data from a user', function (done) {
        var drawing1;
        var drawing2;
        var saveData1 = {
            owner: 1,
            image: testDataURL1,
        };
        var saveData2 = {
            owner: 1,
            image: testDataURL2,
        };
        drawing1 = new DrawingModel.Model(saveData1);
        drawing1.save();
        drawing2 = new DrawingModel.Model(saveData2);
        drawing2.save();
        DrawingModel.Model.findByOwner(1, function (err, accounts) {
            var account1 = accounts[0].toAPI();
            var account2 = accounts[1].toAPI();
            chai.expect(err).to.be.null;
            chai.expect(accounts).not.to.be.null;
            chai.expect(accounts.length).to.eql(2);
            chai.expect(account1.createdDate).to.be.a('Date');
            chai.expect(account2.createdDate).to.be.a('Date');
            chai.expect(account1.image.toString()).not.to.eql(account2.image.toString());
            chai.expect(account1.image.toString()).to.eql(testDataURL1);
            chai.expect(account2.image.toString()).to.eql(testDataURL2);
        });
        done();
        // var saveDrawing1 = function (callback) {
        //     drawing1 = new DrawingModel.Model(saveData1);
        //     drawing1.save(callback);
        // };
        // var saveDrawing2 = function (callback) {
        //     drawing2 = new DrawingModel.Model(saveData2);
        //     drawing2.save(callback);
        // };
        // var testData = function () {
        //     DrawingModel.findByOwner(1, function (err, accounts) {
        //         chai.expect(err).to.be.null;
        //         chai.expect(accounts).to.be.an('Object');
        //         done();
        //     });
        // };
        // saveDrawing1(function (err1) {
        //     chai.expect(err1).to.be.null;
        //     saveDrawing2(function (err2) {
        //         chai.expect(err2).to.be.null;
        //         testData();
        //     });
        // });
    });
});
