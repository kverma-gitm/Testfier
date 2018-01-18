var express = require('express');
var app =express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var methodOverride = require('method-override');
var path = require('path');
var fs = require('fs');
var cors = require('cors');
var logger = require('morgan');
var passport = require('passport');
var flash = require('connect-flash');

app.use(cors({
    origin: '*',
    withCredentials: false,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin' ]
}));

//body parser and cookie parser middleware
app.use(bodyParser.json({limit:'10mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'10mb',extended:true}));
app.use(cookieParser());

//including passport module from other file
require('./server/config/passport')(passport);

app.use(passport.initialize()); //to initialize passport service
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


//public folder as static
app.use(express.static(path.resolve(__dirname,'public')));

//response generating Liberary
var resGenerator = require('./server/libs/resGenerator');

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
var dbPath = "mongodb://localhost/TestForAdmin";
mongoose.connect(dbPath,{useMongoClient: true});
mongoose.connection.once('open',function(){
  console.log("Database Connection Established Successfully");
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
  console.log("Testfier is Running on port:" +port);
});
