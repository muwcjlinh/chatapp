var Mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var SALT = 10;
var defaultPictrure = "./img/user.jpg";

// Schema User store in mongo
var UserSchema = new Mongoose.Schema({
    username: { type: String, required: true},
    password: { type: String, default: null},
    socialID: { type: String, default: null},
    pictrue: { type: String, default: defaultPictrure}
});

// Hash user's password using bcrypt
UserSchema.pre('save', function(next) {
    var user = this;

    // make sure that user has picture
    if (!user.pictrue) {
        user.pictrue = defaultPictrure;
    };

    // only hash the password if it hsa been modified or it is new
    if (!user.isModified('password')) {
        return next();
    };

    // bcrypt gen salt, then hash the password
    bcrypt.genSalt(SALT, function(err, salt) {
        if (err) {
            return next(err);
        };

        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) {
                return next(err);
            };
            user.password = hash;
            next();
        });
    });
});

// Create method to validate password
UserSchema.method.validatePassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(err, isMatched){
        if (err){
            return callback(err);
        };
        callback(null, isMatched);
    });
};

// create userModel
var userModel = Mongoose.model('user', UserSchema);

module.exports = userModel;


