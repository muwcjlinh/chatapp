var Mongoose = require('mongoose');
var config = require('../config');
var user = require('./schemas/user');
// var logger = require('../logger');

// connect to mongo data base
var dbURI = "mongodb://" + config.db.host + ":" + config.db.port + "/" + config.db.name;
Mongoose.connect(dbURI);

// throw an err if can't connect to the database
Mongoose.connection.on('error', function(err) {
    if(err){
        throw err;
    };
});

Mongoose.Promise = global.Promise;

module.exports = { Mongoose,
     models: {
        user
}};

