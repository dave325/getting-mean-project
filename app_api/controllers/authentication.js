var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var sendJSONresponse = function(res,status,content){
	res.status(status);
	res.json(content);
}

// Will register a user 
module.exports.register = function(req,res){
	if(!req.body.name || !req.body.email || !req.body.password){
		console.log(req.body);
		sendJSONresponse(res, 400, {
			"message": "All fields required"
		});
		return;
	}
	// Create a new user in the scope 
	var user = new User();
	user.name = req.body.name;
	user.email = req.body.email;
	// This will set the hash and salt
	user.setPassword(req.body.password);
	
	// Save the user to the database 
	user.save(function(err){
		var token;
		if(err){
			sendJSONresponse(res, 404, err);
		}else{
			// Gereate a JWT and send it to the browser 
			token = User.generateJwt();
			sendJSONresponse(res, 200,{
				"token" : token
			});
		}
	});
};

// Will validate a login 
module.exports.login = function(req,res){
	// Check if fields are available 
	if(!req.body.email || !req.body.password){
		sendJSONresponse(res, 400,{
			"message" : "All fields required"
		});
		return;
	}
	// Use passport to authenticate user 
	passport.authenticate('local',function(err,user,info){
		var token;
		// If passport returns an error
		if(err){
			sendJSONresponse(res,404, err);
			return;
		}
		//if passport generates a response then generate a JWT
		if(user){
			token = User.generateJwt();
			sendJSONresponse(res,200,{
				"token" : token
			});
		}else{
			// Returns why authentication failed
			sendJSONresponse(res,401,info);
		}
	})(req,res);
	
}