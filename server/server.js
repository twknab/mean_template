// Setup App Dependencies:
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    path = require('path'),
    port = 8000;

// Configure App, Setup Static Folders (possibly setup Session if using)
require('./config/app')(express, app, bodyParser, path);

// Setup Mongoose and Models:
require('./config/db');

//////////////////////////////////////////////////////////////////
//////// JASON'S EXAMPLE OF MIDDLEWARE USAGE WITH SESSION ////////
//////////////////////////////////////////////////////////////////
//                                                              //
// app.use(function(req, res, next) {                           //
//     var User = require('mongoose').model('User')             //
//                                                              //
//     if (req.session.userID) {                                //
//         User.findById(req.session.userID)                    //
//             .then(function(user) {                           //
//                 req.user = user;                             //
//                 next();                                      //
//             })                                               //
//             .catch(next);                                    //
//     }                                                        //
//                                                              //
//     next(new Error('User not found.'));                      //
// ;})                                                          //
//                                                              //
//////////////////////////////////////////////////////////////////

// Setup Server-Side Routing:
require('./config/routes')(app);

// Setup Server to Listen and Run:
app.listen(port, function() {
    console.log('Server listening on port:', port);
});
