(function(){
	authentication.$inject = ['$http','$window'];
	function authentication ($http, $window){
		var saveToken = function(token){
			$window.localStorage['loc8r-token'] = token;
		};
		var getToken = function(){
			return $window.localStorage['loc8r-token'];
		}
		var register = function(user){
			return $http.post('/api/register', user).then(function(data){
				saveToken(data.token);
			});
		}
		var login = function(user){
			return $http.post('/api/login', user).then(function(data){
				saveToken(data.token);
			});
		}
		var logout = function(user){
			$window.localStorage.removeItem['loc8r-token'];
		}
		var isLoggedIn = function(){
			var token = getToken();
			console.log(token);
			if (token){
				var payload = JSON.parse($window.atob(token.split('.')[1]));
				return payload.exp > Date.now() / 1000;
			}else{
				return false;
			}
		}
		var currentUser = function(){
			if(isLoggedIn()){
				var token = getToken();
				var payload = JSON.parse($window.atob(token.split('.')[1]));
				return {
					name : payload.name,
					email : payload.email
				}
			}
		}
		return {
			saveToken : saveToken,
			getToken : getToken,
			register : register,
			login : login,
			logout : logout,
			isLoggedIn : isLoggedIn,
			currentUser : currentUser
		};
	}
	angular.module('loc8rApp')
		.service('authentication', authentication);
})();