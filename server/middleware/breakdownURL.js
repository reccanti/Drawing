/**
 * Breakdown the url into an array before passing to the next
 */
var breakdownURL = function (req, res, next) {
    var arr = req.url.split('/');

    /* eslint no-param-reassign: 0 */
    req.urlVars = arr;
    next();
};

module.exports = breakdownURL;
