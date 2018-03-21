'use strict';

// Chat application dependencies
var express 	= require('express');
var app  		= express();
var path 		= require('path');
var bodyParser 	= require('body-parser');
var flash 		= require('connect-flash');

// Chat application components
var passport    = require('./app/auth');
var session 	= require('./app/session');
// var routes 		= require('./app/routes');
// var ioServer 	= require('./app/socket')(app);
var logger 		= require('./app/logger');

// Set the port number
var port =  3000;

// Middlewares
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

console.log(passport);

app.use(session);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// View engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

app.use(require('./app/routes/index'));

app.listen(port, () => {
    console.log(`Your server is running on port ${port}`);
  })

// // Middleware to catch 404 errors
// app.use(function(req, res, next) {
//   res.status(404).sendFile(process.cwd() + '/app/views/404.htm');
// });

// ioServer.listen(port);