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
	    clientID: configAuth.facebookAuth.clientID,
	    clientSecret: configAuth.facebookAuth.clientSecret,
	    callbackURL: configAuth.facebookAuth.callbackURL,
        profileFields: ['id', 'displayName'] //profile Fields...
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