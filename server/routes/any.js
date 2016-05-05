var express = require('express');
var router = express.Router();
var mid = require('../middleware');
var controllers = require('../controllers');


/**
 * Go through the necessary steps to sign the user up for
 * an account.
 */
router.get('*',
    mid.breakdownURL,
    mid.getUsername,
    controllers.any
);


module.exports = router;
