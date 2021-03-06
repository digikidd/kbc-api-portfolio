//Declarations of the modules
var express = require ('express');
var http = require ('http');
var bodyParser = require ('body-parser');
var morgan = require ('morgan');
var mongoose = require ('mongoose');

//Defining Routes
var portfolioroutes = require ( './routes/portfolioRoutes');

//We create a var with the express app and another one with the server
var app = express ();
var server = http.createServer (app);

//The port
var port = process.env.PORT || 3131;

//Database connection
mongoose.connect ('mongodb://admin:admin@ds029466.mlab.com:29466/kbc-projects');

//Feedback of the connection (if error or if succeed)
var db = mongoose.connection;
db.on ('error', console.error.bind (console, 'connection error:'));

// configuration =================
app.use (bodyParser.json ()); //To be able to use json
app.use (bodyParser.urlencoded ({extended: true}));
app.use (morgan ('dev')); //Logger
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'accept, content-type, x-parse-application-id, x-parse-rest-api-key, x-parse-session-token');
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
});

//Routes
app.use('/portfolio', portfolioroutes);

//We start the server
server.listen (port);
console.log ("API magic is happening on port " + port);
