(function(){
	navigationCtrl.$inject =  ['$location','authentication'];
	function navigationCtrl ($location, authentication){
		var navvm = this;
		navvm.currentPath = $location.path();
		navvm.isLoggedIn = authentication.isLoggedIn();
		navvm.currentUser = authentication.currentUser();
		navvm.logout = function(){
			console.log('clicked');
			authentication.logout();
			$location.path('/');
		};
	}
	angular.module('loc8rApp')
		.controller('navigationCtrl', navigationCtrl);
})();