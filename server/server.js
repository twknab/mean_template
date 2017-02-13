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

// Setup Custom Mongoose Middleware (if using):
require('./middleware/user')(app);

// Setup Server-Side Routing:
require('./config/routes')(app);

// Setup Server to Listen and Run:
app.listen(port, function() {
    console.log('Server listening on port:', port);
});
