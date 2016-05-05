var express = require('express');
var router = express.Router();
var Drawing = require('../controllers').Drawing;
var User = require('../controllers').User;
var mid = require('../middleware');


/**
 * Go through the necessary steps to sign the user up for
 * an account.
 */
router.post('/saveImage', function (req, res) {
    Drawing.saveImage(req, res);
});


router.post('/getImages',
            mid.breakdownURL,
            mid.getUsername,
            function (req, res) {
                User.getImages(req, res);
            });


module.exports = router;
