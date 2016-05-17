var express = require('express');
var router = express.Router();
var Drawing = require('../controllers').Drawing;
var mid = require('../middleware');

router.post('/getImage',
            mid.breakdownURL,
            mid.getImageId,
            function (req, res) {
                Drawing.getImageById(req, res);
            });
            
module.exports = router;