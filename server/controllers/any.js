/**
 * At any url, render the index page with the
 * appropriate settings.
 */
var anyURL = function (req, res) {
    var settings = {};
    
    settings.message = "Make and share drawings quickly";
    if (req.uName) {
        settings.message = "A drawing by " + req.uName;
    }
    
    res.render('index', settings);
};

module.exports = anyURL;