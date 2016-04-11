var express = require('express');
var router = express.Router();
// var controllers = require('../controllers');
// var User = controllers.User;


/**
 * Check to see if the user has a session stored. If so, log them
 * into the system.
 */
router.post('/login', function (req, res) {
    if (req.session.account) {
        res.json(req.session.account);
    } else {
        res.status(403).json({
            error: 'User is not logged in',
        });
    }
});


/**
 * Log the user out of the system by destroying the session
 */
router.post('/logout', function (req, res) {
    req.session.destroy();
    res.json({});
});
module.exports = router;
