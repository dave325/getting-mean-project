(function(){
	function pageHeader(){
		return {
			restrict :"EA",
			scope:{
				// Use the scope to pass through the content object that html template is looking for
				content:'=content'
			},
			templateUrl : '/angular-modules/common/directive/pageHeader/pageHeader.template.html'
		}
	}
angular.module('loc8rApp')
	.directive('pageHeader',pageHeader);
})();