//Declarations of the modules
var express = require ('express');
var http = require ('http');
var bodyParser = require ('body-parser');
var morgan = require ('morgan');
var mongoose = require ('mongoose');
//Defining Routes
// var wagonRoutes = require ('./routes/wagonRoute');
// var userRoutes = require ('./routes/userRoute');


//Models
// var wagon = require ('./models/wagons');
// var wagonUser = require ('./models/wagonUser');

//We create a var with the express app and another one with the server
var app = express ();
var server = http.createServer (app);

//The port
var port = process.env.PORT || 3131;


//Database connection
mongoose.connect ('mongodb://root:root@ds029705.mlab.com:29705/foodtruck'); //Connect with mongolab service

//Feedback of the connection (if error or if succeed)
var db = mongoose.connection;
db.on ('error', console.error.bind (console, 'connection error:'));
db.once ('open', function () {
    console.log ("Connected to DB!");
});

// configuration =================
app.use (bodyParser.json ()); //To be able to use json
app.use (bodyParser.urlencoded ({extended: true}));
app.use (morgan ('dev')); //Logger

//Routes
// app.use('/wagon', wagonRoutes);
// app.use('/user', userRoutes);

//We start the server
server.listen (port);
console.log ("API magic is happening on port " + port);
