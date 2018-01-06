//Including Express Module....
var express = require('express');
//creating an Instance of Express Module...
var app =express();
//Including Mongoose for databse connectivity...
var mongoose = require('mongoose');
//Including body-parser to parse the header
var bodyParser = require('body-parser');
//Including cookie-parser to parse the cookie...
var cookieParser = require('cookie-parser');
//Create a session middleware....
var session = require('express-session');
//Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
var methodOverride = require('method-override');
//Including path module to include static files...
var path = require('path');
//includig file system to read and write files...
var fs = require('fs');
//Cross-origin resource sharing (CORS) is a mechanism that allows restricted resources (e.g. fonts) on a web page to be 
//requested from another domain outside the domain from which the first resource was served.
////HTTP request logger middleware for node.js
var logger = require('morgan');
//including passport module for using passport strategy...
var passport = require('passport');
//for showing flsh messages when there is any success or failure events occur...
var flash = require('connect-flash');
//using cors for cross origin file sharing

var http = require('http');
http.createServer(function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
});

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });
//parsing  and cookie middlewares
app.use(bodyParser.json({limit:'10mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'10mb',extended:true}));
app.use(cookieParser());

//including passport module from other file...
require('./server/config/passport')(passport);




app.use(passport.initialize()); //to initialize passport service...
app.use(passport.session()); // persistent login sessions...
app.use(flash()); // use connect-flash for flash messages stored in session...


//public folder as static
app.use(express.static(path.resolve(__dirname,'./../public')));

//response generating Liberary
var resGenerator = require('./server//libs/resGenerator');

//Including User model and UserAuth Model
var userModel = require('./server/app/models/User');

//including controller files
var Routes = require('./server/app/controllers/routes');
app.use('/users', Routes);

var TestRoutes = require('./server/app/controllers/testRoutes');
app.use('/tests', TestRoutes);

require('./server/app/controllers/facebookRoute')(app, passport);

require('./server/app/controllers/googleRoute')(app, passport);


var UserAuth = require('./server/app/models/UserAuth');
var GoogleAuth = require('./server/app/models/GoogleAuth');

//User Information of facebook

app.get('/getUserinfofacebook', function(req, res) {
  UserAuth.find(function(error, user) {
    if (error) {
      //console.log("error");
      var err = resGenerator.generate(true, "Something is not working, error  : " + error, 500, null);
      res.json(err);
    } 
     else {
         var response = resGenerator.generate(false, "Successfully Got all user info", 200, user);
          res.json(user);
        }
      });
    });


//User Information of google

app.get('/getUserinfogoogle', function(req, res) {
  GoogleAuth.find(function(error, user) {
    if (error) {
      //console.log("error");
      var err = resGenerator.generate(true, "Something is not working, error  : " + error, 500, null);
      res.json(err);
    } 
     else {
         var response = resGenerator.generate(false, "Successfully Got all user info", 200, user);
          res.json(user);
        }
      });
    });

//Setting port to 3000..
var port = 3000;

//To log HTTP Requests..
app.use(logger('dev'));

//Data Base Connection
var dbPath = "mongodb://localhost/TestPortalDB";
mongoose.connect(dbPath);
mongoose.connection.once('open',function(){
  console.log("Database Connection Established Successfully...");
});


//handling 404 error.
app.use(function(req, res, next){
  res.status(404);
  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }
  res.send('Not found');
});

//Listening on port 3000
app.listen(port,  function(){
  console.log("Testifier is Running on port:" +port);
});
