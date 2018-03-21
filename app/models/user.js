var userModel = require('../database').models.user;

// Create 
var create = function(data, callback) {
    var newUser = new userModel(data);
    newUser.save(callback) ;
};

// findeOne
var findOne = function(data, callback) {
    userModel.findOne(data, callback);
};

// findById
var findById = function(data, callback) {
    userModel.findById(data, callback);
};

//  allow user access to the page if already logged in 
var isAuthenticated = function (req, res, next) {
	if(req.isAuthenticated()){
		next();
	}else{
		res.redirect('/');
	}
}

module.exports = {
    create,
    findOne,
    findById,
    // findOrCreate,
    isAuthenticated
};