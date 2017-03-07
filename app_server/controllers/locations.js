/**
 * Define the locations controllers 
 */

module.exports.homeList = function(req, res){
	res.render('locations-list', {title: 'Home', author : 'David'});
}
module.exports.locationInfo = function(req, res){
	res.render('location-info', {title: 'Location Info', author: 'david'});
}
module.exports.addReview = function(req, res){
	res.render('locations-review-form', {title: 'Add Review', author: 'David'});
}