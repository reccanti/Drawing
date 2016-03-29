var express = require("express");
var router = express.Router();
var User = require("../controllers").User;


/**
 * Go through the necessary steps to sign the user up for
 * an account.
 */
//router.post("/", User.signup);
router.post("/", function(req, res) {
    console.log("logging in");
    User.login(req, res);
});



module.exports = router;