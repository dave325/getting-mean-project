(function(){
angular.module('loc8rApp')
	.service('loc8rData', loc8rData);

loc8rData.$inject = ["$http"];
function loc8rData($http) {
	var locationByCoords = function(lng, lat) {
		return $http.get('/api/locations?lng=-0.871938&lat=48.122385&distance=20');
	}
	var locationById = function(locationid){
		return $http.get('/api/locations/' + locationid);
	}
	var addReviewById = function(locationid, data){
		return $http.post('/api/locations/' + locationid + '/reviews', data)
	}
	return {
		locationByCoords : locationByCoords,
		getLocationById : locationById,
		addReviewById : addReviewById
	}
}
})();