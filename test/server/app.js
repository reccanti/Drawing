var app = require("../../server/app");
var chai = require("chai");
var request = require("supertest");

describe("Test that we can get the app", function() {
    it("connects to the server", function(done) {
        request(app)
            .get("/")
            .end(function(err, res) {
                if (err) {
                    done(err);
                }
                done();
            });
    });
});