(function(){
angular.module('loc8rApp', [ 'ngRoute', 'ngSanitize', 'ui.bootstrap' ]);

function config($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl : '/angular-modules/home/home.view.html',
			controller : 'homeCtrl',
			controllerAs: 'vm'
		})
		.when('/about',{
			templateUrl : '/angular-modules/common/views/genericText.view.html',
			controller: 'aboutCtrl',
			controllerAs: 'vm'
		})
		.when('/location/:locationid',{
			templateUrl:'/angular-modules/locationDetail/locationDetail.view.html',
			controller: 'locationDetailCtrl',
			controllerAs:'vm'
		})
		.when('/register',{
			templateUrl:'/angular-modules/auth/register/register.view.html',
			controller: 'registerCtrl',
			controllerAs:'vm'
		})
		.when('/login',{
			templateUrl:'/angular-modules/auth//login/login.view.html',
			controller: 'loginCtrl',
			controllerAs:'vm'
		})
		.otherwise({
			redirectTo : '/'
		});
}
function configLocation($locationProvider){
	$locationProvider.html5Mode(true);
	$locationProvider.hashPrefix('/');
}
angular.module('loc8rApp')
	.config(['$routeProvider', config])
	.config(['$locationProvider',configLocation]);
})();