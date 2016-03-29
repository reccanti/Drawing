var models = require("../models");
var User = models.User;


/**
 * This function attempts to sign a user into the system.
 * It first validates the inputs, ensuring that all the required
 * fields have been filled and that each of the password fields
 * match. 
 * 
 * If this is successful, it generates a hash and salt value and 
 * saves it into the database
 */
var signup = function(req, res) {
    console.log("in signup");
    if (!req.body.username ||
        !req.body.name ||
        !req.body.password ||
        !req.body.password_conf) {
        return res.status(400).json({error: "All fields are required"});
    }
    if (req.body.password !== req.body.password_conf) {
        return res.status(400).json({error: "passwords don't match"});
    }
    User.Model.generateHash(req.body.password, function(salt, hash) {
        var userData = {
            username: req.body.username,
            name: req.body.name,
            salt: salt,
            password: hash
        };
        var newUser = new User.Model(userData);
        newUser.save(function(err) {
            if (err) {
                console.error(err);
                return res.status(400).json({error: "an error occurred when saving your account to the database"});
            }
            console.log("saved");
            req.session.account = newUser.toAPI();
            res.json({redirect: "/account"});
        })
    });
}


module.exports.signup = signup;