var mongoose = require("mongoose");
var dbURL = "mongodb://localhost/Drawing-Test";
var UserModel = require("../../server/models/User");
var UserController = require("../../server/controllers/User");
var chai = require("chai");

mongoose.connect(dbURL);
describe("Static tests for the model", function() {
    it("checks that the Model generates a hash value", function(done) {
        UserModel.Model.generateHash("test password", function(salt, hash) {
            chai.expect(salt).not.to.be.a("string");
            chai.expect(hash).to.be.a("string");
            done();
        });
    });
    it("is connected to the database", function(done) {      
        chai.expect(mongoose.connection.db).to.not.be.undefined;
        done();
    })
});


describe("Tests the User model", function() {    
    
    
    beforeEach(function(done) {
        function clearDB() {
            for (var i in mongoose.connection.collections) {
                mongoose.connection.collections[i].remove(function() { });
            }
            return done();
        }


        if (mongoose.connection.readyState === 0) {
            mongoose.connect(config.db.test, function(err) {
                if (err) {
                    throw err;
                }
                return clearDB();
            });
        } else {
            return clearDB();
        }
    });
    
    
    it("Saves a User with the correct information", function(done) {
        var password = "test password";
        UserModel.Model.generateHash(password, function(salt, hash) {
            var userData = {
                username: "testUser",
                name: "user1",
                password: hash,
                salt: salt
            };
            var testUser = new UserModel.Model(userData);
            testUser.save(done);
        });
    });
    
    
    it("Correctly validates a password", function(done) {
        var password = "test password";
        UserModel.Model.generateHash(password, function(salt, hash) {
            var userData = {
                username: "testUser",
                name: "user1",
                password: hash,
                salt: salt
            };
            var testUser = new UserModel.Model(userData);
            testUser.save(
                testUser.validatePassword(password, function(res) {
                    chai.expect(res).to.be.true;
                    done();
                })
            );
        });
        
    });
    
    
    
});