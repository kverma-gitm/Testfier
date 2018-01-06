//facebook strategy for login...
var FacebookStrategy = require('passport-facebook').Strategy;
var UserAuth = require('../app/models/UserAuth');
var configAuth = require('./auth');

module.exports = function(passport) {

	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user);
		});
	});

	passport.use(new FacebookStrategy({
        clientID: '228637434340936',
        clientSecret: '9fdabd9a0c593040ccdfb67aa7213845',
        callbackURL: "http://localhost:3000/auth/facebook/callback",
        profileFields: ['email']
	  },
	  function(accessToken, refreshToken, profile, done) {
	    	process.nextTick(function(){
	    		UserAuth.findOne({'id': profile.id}, function(err, user){

	    	
	    			if(err)
	    				return done(err);
	    			if(user)
	    			{   
	    				return done(null, user);
	    			}
	    			else {
	    				console.log(profile);
	    				var newUser = new UserAuth();
	    				newUser.id = profile.id;
	    				newUser.name = profile.displayName;
	
	    				newUser.save(function(err){
	    					if(err)
	    						throw err;
	    					return done(null, newUser);
	    				
	    				})

	    				
	    			}
	    		});
	    	});
	    }

	));


	


};