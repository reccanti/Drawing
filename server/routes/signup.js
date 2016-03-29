var express = require("express");
var router = express.Router();
var User = require("../controllers").User;

console.log("setting up signup route");

/**
 * Go through the necessary steps to sign the user up for
 * an account.
 */
//router.post("/", User.signup);
router.post("/", function(req, res) {
    console.log("signing up");
    User.signup(req, res);
});



module.exports = router;