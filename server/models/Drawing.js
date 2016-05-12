var mongoose = require('mongoose');
var DrawingModel;

/**
 * Define the User's schema. The fields are as
 * follows:
 *
 * @property {Buffer} image - a dataurl containing the image
 * data
 *
 * @property {ObjectId} owner - the person who created the
 * drawing
 */
var DrawingSchema = new mongoose.Schema({
    image: {
        type: Buffer,
        contentType: 'image/png',
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


/**
 * Returns the information from the schema as a
 * an object that can be more easily interacted with
 */
DrawingSchema.methods.toAPI = function () {
    return {
        id: this._id,
        image: this.image.toString(),
        creator: this.owner.name,
        createdDate: this.createdDate,
    };
};


/**
 * Given the unique ID of the Drawing, retrieve it from the database
 */
DrawingSchema.statics.findById = function (id, callback) {
    var search = {
        _id: id,
    };
    return DrawingModel
        .findOne(search)
        .select('image owner createdDate')
        .exec(callback);
};


/**
 * Given the ID of a User, find all of the images associated with
 * that User
 */
DrawingSchema.statics.findByOwner = function (ownerId, callback) {
    var search = {
        owner: mongoose.Types.ObjectId(ownerId),
    };
    return DrawingModel
        .find(search)
        .populate('owner')
        .sort({ createdDate: -1 })
        .select('image owner createdDate')
        .exec(callback);
};


DrawingModel = mongoose.model('Drawing', DrawingSchema);


module.exports.Schema = DrawingSchema;
module.exports.Model = DrawingModel;
