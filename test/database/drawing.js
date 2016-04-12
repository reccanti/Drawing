var mongoose = require('mongoose');
var dbURL = 'mongodb://localhost/Drawing-Test';
var DrawingModel = require('../../server/models/Drawing');
var chai = require('chai');
var testDataURL = require('./dataURL.js');

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
            image: testDataURL,
        };
        var drawing = new DrawingModel.Model(saveData);
        chai.expect(drawing.save).not.to.throw(Error);
        done();
    });


    it('Gets the correct information from toAPI', function (done) {
        var saveData = {
            owner: 1,
            image: testDataURL,
        };
        var drawing = new DrawingModel.Model(saveData);
        var api = drawing.toAPI();
        chai.expect(api.image.toString()).to.eql(testDataURL);
        chai.expect(api.createdDate).to.be.a('Date');
        done();
    });
});
