/**
 * Breakdown the url into an array before passing to the next
 */
var getUsername = function(req, res, next) {
    var uIndex = req.urlVars.indexOf('u');
    var username = req.urlVars[uIndex + 1];
    req.uName = username;
    next();
};

module.exports = getUsername;