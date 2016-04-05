/**
 * This section tests the User data structure. It tests that
 * the User model works as expected and that interactions using
 * the controllers works as expected.
 */
'use strict';

// jest.dontMock("../../server/models/User");
// jest.dontMock("../../server/controllers/User");
jest.autoMockOff();

var mongoose = require("mongoose");
var dbURL = "mongodb://localhost/Drawing-Test";
var UserModel = require("../../server/models/User");
var UserController = require("../../server/controllers/User");

mongoose.connect(dbURL);
describe("Static tests for the model", function() {
    it("checks that the Model generates a hash value", function(done) {
        UserModel.Model.generateHash("test password", function(salt, hash) {
            expect(salt).toEqual(jasmine.any(Object));
            expect(hash).toEqual(jasmine.any(String));
            done();
        });
    });
    it("is connected to the database", function(done) {      
        expect(mongoose.connection.db).toBeDefined();
        done();
    })
});


describe("Tests the User model", function() {    
    it("Saves a User with the correct information", function(done) {
        var password = "test password";
        UserModel.Model.generateHash(password, function(salt, hash) {
            expect(salt).toEqual(jasmine.any(Object));
            expect(hash).toEqual(jasmine.any(String));
            var userData = {
                username: "testUser",
                name: "user1",
                password: hash,
                salt: salt
            };
            console.log(new UserModel.Model({}));
            console.log(userData);
            var newUser = new UserModel.Model(userData);
            // var testUser = new UserModel.Model(userData);
            // testUser.save(done);
            done();
        });
    });
});