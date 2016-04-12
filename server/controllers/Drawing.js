// var models = require('../models');
// var Drawing = models.Drawing;


// /**
//  * Save an image to the database
//  */
// var saveImage = function (req, res) {
//     if (!req.body.owner ||
//         !req.body.dataURI) {
//         return res.status(400).json({ error: 'All fields are required' });
//     };
//     var data = {
//         owner: req.body.owner,
//         image: req.body.dataURI,
//     };
//     // User.Model.generateHash(req.body.password, function (salt, hash) {
//     //     var userData = {
//     //         username: req.body.username,
//     //         name: req.body.name,
//     //         salt: salt,
//     //         password: hash,
//     //     };
//     //     var newUser = new User.Model(userData);
//     //     newUser.save(function (err) {
//     //         if (err) {
//     //             /* eslint no-console: 0 */
//     //             console.error(err);
//     //             return res.status(400).json({
//     //                 error: 'an error occurred when saving your account to the database',
//     //             });
//     //         }
//     //         req.session.account = newUser.toAPI();
//     //         res.status(200).json(newUser.toAPI());
//     //     });
//     // });
// };


// module.exports
