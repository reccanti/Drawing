/**
 * Breakdown the url into an array before passing to the next
 */
var getImageId = function (req, res, next) {
    var iIndex = req.urlVars.indexOf('i');
    var imageId = req.urlVars[iIndex + 1];

    /* eslint no-param-reassign: 0 */
    req.imageId = imageId;
    next();
};

module.exports = getImageId;
