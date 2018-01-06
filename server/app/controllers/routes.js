var express = require('express');
var app = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var resGenerator = require('./../../libs/resGenerator');
var validator = require('./../../middlewares/validator');
//defining token...
var token;
// used to create, sign, and verify tokens
var jwt = require('jsonwebtoken');

//json secret key
var jsonSecret = "97hw9a73hr2q@#$#@mo8afjoeidha0e8doh";


//defining Auth as middleware for accessing api's
//defining decoded tokens...
var decodedToken;
var auth = function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, "97hw9a73hr2q@#$#@mo8afjoeidha0e8doh", function (err, decoded) {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Failed to authenticate token.'
                });
            } else {
                // if everything is good, save to request for use in other routes
                decodedToken = decoded;
                console.log("Decoded Token");
                console.log(decodedToken);
                next();
            }
        });
    }
}

//route to login
app.post('/login', validator.login, function (req, res) {
    //search for entered email id in mongodb
    User.findOne({
        email: req.body.email
    }, function (error, user) {
        // console.log("user : "+user);
        if (error) {
            var err = resGenerator.generate(true, "Something is not working : " + error, 500, null);
            res.json(err);
        } else if (user === null || user === undefined || user.name === null || user.name === undefined) {
            var response = resGenerator.generate(true, "No user found !! Check email and try again... ", 400, null);
            res.json(response);
        } else if (!user.compareHash(req.body.password)) {
            var response = resGenerator.generate(true, "Wrong password!! Check password and try again...", 401, null);
            res.json(response);
        } else {

            //creating jwt token for user to authenticate other requests
            token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 60),
                id: user._id,
                email: user.email,
                name: user.name,
                mobileNumber: user.mobileNumber
            }, jsonSecret);

            var response = resGenerator.generate(false, "Logged in Successfully", 200, user);
            response.token = token;
            res.json(response);
        }

    });

});
// end login route

//route to signup
app.post('/signup', validator.signup, function (req, res) {


    //check if email id already exists and flag if exists
    User.findOne({
        email: req.body.email
    }, function (error, user) {

        if (error) {
            //console.log("error");
            var err = resGenerator.generate(true, "Something is not working, error  : " + error, 500, null);
            res.json(err);
        } else if (user) {
            //console.log("user");
            var err = resGenerator.generate(true, "email  already exists, please Login", 400, null);
            res.json(err);
        } else {

            //new user instance
            var newUser = new User({

                name: req.body.name,
                email: req.body.email,
                mobileNumber: req.body.mobileNumber,
                security: req.body.security,
                answer: req.body.answer
            });
            newUser.password = newUser.generateHash(req.body.password);

            //saving user data in mongodb
            newUser.save(function (error) {
                if (error) {
                    var response = resGenerator.generate(true, "Some error occured : " + error, 500, null);
                    res.json(response);
                } else {

                    token = jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 60),
                        id: newUser._id,
                        email: newUser.email,
                        name: newUser.name,
                        mobileNumber: newUser.mobileNumber
                    }, jsonSecret);

                    var response = resGenerator.generate(false, "Successfully signed up", 200, newUser);
                    response.token = token;
                    res.json(response);
                }
            });
        }
    });

});
//end signup route


app.post('/reset', validator.reset, function (req, res) {
    console.log("this is reset api");
    //search for entered email id in mongodb
    User.findOne({
        email: req.body.email
    }, function (error, user) {

        console.log("user : " + user);

        if (error) {
            var err = resGenerator.generate(true, "Something is not working : " + error, 500, null);
            res.json(err);
        } else if (user === null || user === undefined || user.name === null || user.name === undefined) {
            var response = resGenerator.generate(true, "No user found !! Check email and try again... ", 400, null);
            res.json(response);
        } else {

            //creating jwt token for user to authenticate other requests
            token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 60),
                id: user._id,
                email: user.email,
                name: user.name,
                mobileNumber: user.mobileNumber
            }, jsonSecret);

            var response = resGenerator.generate(false, "reset command has been executed Successfully!", 200, user);
            response.token = token;
            res.json(response);
        }

    });

});
// end login route

app.post('/securityQuestion', function (req, res) {
    console.log("this is security api");
    //search for entered email id in mongodb
    User.findOne({
        _id: req.body._id
    }, function (error, user) {

        console.log("user : " + user);

        if (error) {
            var err = resGenerator.generate(true, "Something is not working : " + error, 500, null);
            res.json(err);
        } else if (user === null || user === undefined || user.security === null || user.security === undefined) {
            var response = resGenerator.generate(true, "No security Question Found!!! ", 400, null);
            res.json(response);
        } else {

            //creating jwt token for user to authenticate other requests
            token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 60),
                id: user._id,
                email: user.email,
                name: user.name,
                mobileNumber: user.mobileNumber
            }, jsonSecret);

            var response = resGenerator.generate(false, "Successfully fetched the security question!!!", 200, user);
            response.token = token;
            res.json(response);
        }

    });

});
// end login route

app.post('/resetpassword', function (req, res) {
    console.log("this is security api");
    //search for entered email id in mongodb
    User.findOne({
        $and: [{
            'answer': req.body.answer
        }, {
            '_id': req.body._id
        }]
    }, function (error, user) {

        console.log("user : " + user);

        if (error) {
            var err = resGenerator.generate(true, "Something is not working : " + error, 500, null);
            res.json(err);
        } else if (user === null || user === undefined || user.answer === null || user.answer === undefined) {
            var response = resGenerator.generate(true, "Incorrect Answer! Please give Correct Answer...(Hint: Check for case sensitive letters...) ", 400, null);
            res.json(response);
        } else {

            user.password = user.generateHash(req.body.password);
            user.save(function (error) {
                if (error) {
                    var response = resGenerator.generate(true, "Some error occured : " + error, 500, null);
                    res.json(response);
                } else {

                    token = jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 60),
                        id: user._id,
                        email: user.email,
                        name: user.name,
                        mobileNumber: user.mobileNumber
                    }, jsonSecret);

                    var response = resGenerator.generate(false, "Successfully changed the password!!!", 200, user);
                    response.token = token;
                    res.json(response);
                }

            });
        }
    });
});


//User Information
app.get('/getUserinfo', auth, function (req, res) {
    User.find(function (error, user) {
        if (error) {
            //console.log("error");
            var err = resGenerator.generate(true, "Something is not working, error  : " + error, 500, null);
            res.json(err);
        } else {
            var response = resGenerator.generate(false, "Successfully Got all user info", 200, user);
            response.token = token;
            res.json(response);
        }
    });
});



//exporting Routes
module.exports = app;
