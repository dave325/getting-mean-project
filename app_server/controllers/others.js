/**
 * Creates the controller for the index router 
 */

module.exports.about = function(req, res, next){
	res.render('generic-text', {title: 'About', author: 'David Dataram'});
}