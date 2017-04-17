(function(){
angular.module('loc8rApp')
	.directive('ratingStars',ratingStars);

function ratingStars(){
	return {
		//Tells Angular to use function only when rating-stars is found
		restrict:'EA',
		scope:{
			thisRating: '=rating'
		},
		templateUrl:'/angular-modules/common/directive/ratingStars/rating-stars.template.html'
	}
}
})();