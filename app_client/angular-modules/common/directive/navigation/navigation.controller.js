(function(){
	navigationCtrl.$inject =  ['$location','authentication'];
	function navigationCtrl ($location, authentication){
		var vm = this;
		vm.currentPath = $location.path();
		vm.isLoggedIn = authentication.isLoggedIn();
		vm.currentUser = authentication.currentUser();
		vm.logout = function(){
			authentication.logout();
			$location.path('/');
		};
	}
	angular.module('loc8rApp')
		.directive('navigationCtrl', navigationCtrl);
})();