/**
 * Creates the controller for the index router 
 */

module.exports.index = function(req, res, next){
	res.render('index', {title: 'Express', author: 'David Dataram'});
}