var express = require('express');
var router = express.Router();
var Drawing = require('../controllers').Drawing;
// var User = require('../controllers').User;


/**
 * Go through the necessary steps to sign the user up for
 * an account.
 */
router.post('/saveImage', function (req, res) {
    /* eslint no-console: 0 */
    console.log(req.body);
    Drawing.saveImage(req, res);
});


router.post('/getImages', function (req, res) {
    Drawing.getImages(req, res);
});


module.exports = router;
