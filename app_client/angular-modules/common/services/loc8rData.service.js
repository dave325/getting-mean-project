(function(){
angular.module('loc8rApp')
	.service('loc8rData', loc8rData);

loc8rData.$inject = ["$http","authentication"];
function loc8rData($http, authentication) {
	var locationByCoords = function(lng, lat) {
		return $http.get('/api/locations?lng=-0.9690884&lat=51.455041&distance=20');
	}
	var locationById = function(locationid){
		return $http.get('/api/locations/' + locationid);
	}
	var addReviewById = function(locationid, data){
		return $http.post('/api/locations/' + locationid + '/reviews', data,{
			//How to add headers to the http call 
			headers:{
				Authorization : 'Bearer '+ authentication.getTokem()
			}
		})
	}
	return {
		locationByCoords : locationByCoords,
		getLocationById : locationById,
		addReviewById : addReviewById
	}
}
})();