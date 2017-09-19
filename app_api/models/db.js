/**
 *	Mongoos Database Connection model  
 */

var mongoose = require('mongoose');

// Create a database URI 
var dbUri = 'mongodb://localhost/Loc8r';
// Change the url if working on a live server 
if(process.env.NODE_ENV === 'production'){
	// retrieve the database URI from the environment variable set up in th CLI s
	dbUri = process.env.MONGOLAB_URI;
}
console.log(dbUri);
// Connects to the database server 
mongoose.connect(dbUri);

// Close mongoose connection, passing through an anonymous function to run when closed
var gracefulShutdown = function(msg,callback){
	mongoose.connection.close(function(){
		console.log('Mongoose disconnected through ' + msg);
		callback();
	});
};

// Create a group of listeners to close the connection thoroughly on all hosting servers

// Listens to nodemon userss
process.once('SIGUSR2', function(){
	gracefulShutdown('nodemon restart', function(){
		process.kill(process.pid, 'SIGUSR2');
	});
});
// Listends to application termination 
process.on('SIGINT', function(){
	gracefulShutdown('app termination', function(){
		process.exit(0);
	});
});

// Listend to Heroku server
process.on('SIGRTERM', function(){
	gracefulShutdown('Heroku app shutdown', function(){
		process.exit(0);
	});
});

//Monitor for successful connection through Mongoose 
mongoose.connection.on('connected', function(){
	console.log('Mongoose connected to ' + dbUri);
});
// Checking for connection error
mongoose.connection.on('error', function(err){
	console.log('Mongoose connection error ' + err);
});
// Checking for disconnection even
mongoose.connection.on('disconnected', function(){
	console.log('Mongoose disconnected');
});
require('./locations.js');
require('./users.js');