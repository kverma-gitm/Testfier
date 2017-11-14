var flash = require('connect-flash');
module.exports = function (app, passport) {

    var resGenerator = require('./../../libs/resGenerator');

    //defining token...
    var token;

    // used to create, sign, and verify tokens
    var jwt = require('jsonwebtoken');

    //json secret key
    var jsonSecret = "97hw9a73hr2q@#$#@mo8afjoeidha0e8doh";

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
                    //console.log("Decoded Token"); 
                    //console.log(decodedToken);  
                    next();
                }
            });
        }
    }


    app.get('/auth/facebook', passport.authorize('facebook', {
        scope: ['email']
    }));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            failureRedirect: '/'
        }),
        function (req, res) {

            var user = req.user;
            //creating jwt token for user to authenticate other requests
            token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 60),
                id: user._id,
                name: user.name
            }, jsonSecret);

            var response = resGenerator.generate(false, "Logged in Successfully", 200, user);
            response.token = token;
            res.json(response);
            //return res.redirect('/dashboard/'+response.data._id);
            //window.location.href="http:localhost:3000/#/dashboard/"+response.data._id;

        });


};
