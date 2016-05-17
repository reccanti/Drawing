var Drawing = require('../models/Drawing');

/**
 * At any url, render the index page with the
 * appropriate settings.
 */
var anyURL = function (req, res) {
    var settings = {};

    console.log("called");
    settings.message = 'Make and share drawings quickly';
    /* eslint no-param-reassing: 0 */
    if (req.uName && req.imageId) {
        Drawing.Model.findById(req.imageId, function (err) {
            if (err) {
                /* eslint no-console: 0 */
                console.error(err);
            }
            // api = doc.toAPI();
            settings.message = 'A drawing by ' + req.uName;
            // settings.image = api.image;
            res.render('index', settings);
        });
    } else {
        res.render('index', settings);
    }
};

module.exports = anyURL;
