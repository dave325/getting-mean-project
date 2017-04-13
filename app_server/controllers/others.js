/**
 * Creates the controller for the index router 
 */
var request = require("request");
var apiOptions = {
		server : "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production'){
	apiOptions.server = "https://quiet-savannah-95070.herokuapp.com/";
}
module.exports.about = function(req, res, next){
	res.render('generic-text', {title: 'About', author: 'David Dataram'});
}
module.exports.angularApp = function(req,res){
	res.render('layout', {title:'Loc8r'});
}