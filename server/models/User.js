var mongoose = require("mongoose");
var crypto = require("crypto");
var iterations = 10000;
var saltLength = 64;
var keyLength = 64;

var UserModel;


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
var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: Buffer,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});


/**
 * This function exports information that should be publicly
 * available
 */
UserSchema.methods.toAPI = function() {
    return {
        username: this.username,
        name: this.name,
        _id: this._id
    }
};


/**
 * This function ensures that the given password is the correct 
 * one for the specified User. It decodes a hashcode generated
 * from the given password and compares it to the stored password.
 * 
 * If they are the same, it runs the given callback with a boolean
 * true parameter. Otherwise, it returns false
 */
UserSchema.methods.validatePassword = function(password, callback) {
    var pass = this.password;
    crypto.pbkdf2(password, this.salt, iterations, keyLength, function(err, hash) {
        if(hash.toString("hex") !== pass) {
            return callback(false);
        }
        return callback(true);
    });
};


/**
 * Find an account with the given username.
 */
UserSchema.statics.findByUsername = function(uname, callback) {
    var search = {
        username: uname
    };
    return UserModel.findOne(search, callback);
};



/**
 * Given a password, use it to generate a password. Once the hash 
 * has been generated, run the given callback
 */
UserSchema.statics.generateHash = function(password, callback) {
    var salt = crypto.randomBytes(saltLength);
    crypto.pbkdf2(password, salt, iterations, keyLength, function(err, hash){
        return callback(salt, hash.toString('hex'));
    });
};


/**
 * Given a username and a password, authenticate this information and run
 * the given callback. It first finds the user by username, then it attempts
 * to validates the found user's password.
 * 
 * If an error occurred when searching for the username, run the callback
 * with an error message.
 * 
 * If no document with the username was found, run the callback with no 
 * parameters
 * 
 * If the username is correct but the password isn't, run the callback
 * with no parameters.
 * 
 * If the username and password are correct, run the callback with no error
 * and the document that was found.
 */
UserSchema.statics.authenticate = function(username, password, callback) {
    return UserModel.findByUsername(username, function(err, doc) {
        // run the callback with the specified error
        if(err) {
            return callback(err);
        }
        // run the callback if no document was found
        if (!doc) {
            return callback();
        }
        doc.validatePassword(password, function(result) {
            if (result) {
                return callback(null, doc);
            }
            return callback();
        });
    });
};


/**
 * Create a User model in mongoose from the UserSchema
 */
UserModel = mongoose.model("User", UserSchema);


module.exports.Model = UserModel;
module.exports.Schema = UserSchema;