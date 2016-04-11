var mongoose = require('mongoose');

/**
 * Define the User's schema. The fields are as
 * follows:
 *
 * @property {String} username - A string that the user will
 * use to log in. This is a reference to the user's unique
 * _id and can be changed
 *
 * @property {String} name - The name that the user will be
 * publicly displayed as. This will be easy to changed
 *
 * @property {String} password - A string that the user will
 * use to log into the system. It is encrypted
 *
 * @property {ObjectId} avatar - A reference to a drawing.
 * This drawing will be displayed with the user and will
 * represent that user
 *
 * @property {ObjectId[]} drawings - an array of drawings
 * that the User has created
 *
 * @property {ObjectId[]} friends - an array of friends
 * that the User has
 */
var DrawingSchema = new mongoose.Schema({
    image: {
        type: Buffer,
        required: true,
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'User',
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
});


module.exports.Schema = DrawingSchema;
