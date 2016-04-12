var mongoose = require('mongoose');
var dbURL = 'mongodb://localhost/Drawing-Test';
var UserModel = require('../../server/models/User');
// var UserController = require('../../server/controllers/User');
var chai = require('chai');


mongoose.createConnection(dbURL);
describe('Static tests for the model', function () {
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


    it('checks that the Model generates a hash value', function (done) {
        UserModel.Model.generateHash('test password', function (salt, hash) {
            chai.expect(salt).not.to.be.a('string');
            chai.expect(hash).to.be.a('string');
            done();
        });
    });
});


describe('Tests the User model', function () {
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
        var password = 'test password';
        UserModel.Model.generateHash(password, function (salt, hash) {
            var userData = {
                username: 'testUser',
                name: 'user1',
                password: hash,
                salt: salt,
            };
            var testUser = new UserModel.Model(userData);
            chai.expect(testUser.save).not.to.throw(Error);
            done();
        });
    });


    it('Correctly validates a password', function (done) {
        var password = 'test password';
        UserModel.Model.generateHash(password, function (salt, hash) {
            var userData = {
                username: 'testUser',
                name: 'user1',
                password: hash,
                salt: salt,
            };
            var testUser = new UserModel.Model(userData);
            testUser.save(
                testUser.validatePassword(password, function (res) {
                    chai.expect(res).to.be.true;
                    done();
                })
            );
        });
    });
});
