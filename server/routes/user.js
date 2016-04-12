var express = require('express');
var router = express.Router();
var Drawing = require('../controllers').Drawing;
// var User = require('../controllers').User;


/**
 * Go through the necessary steps to sign the user up for
 * an account.
 */
router.post('/saveDrawing', function (req, res) {
    Drawing.signup(req, res);
});


module.exports = router;
