(function(){
	angular.module('loc8rApp')
		.directive('navigation',navigation);
	
	function navigation(){
		return {
			restrict:'EA',
			templateUrl:'/angular-modules/common/directive/navigation/navigation.template.html',
			controller:'navigationCtrl',
			controllerAs:'navvm'
		}
	}
	
})();