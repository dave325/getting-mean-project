(function(){
angular.module('loc8rApp')
	.service('loc8rData', loc8rData);

loc8rData.$inject = ["$http","authentication"];
function loc8rData($http, authentication) {
	var locationByCoords = function(lng, lat) {
		return {
			"_id": {
				"$oid": "58c0290f31d9c9325f7b5ee2"
			},
			"name": "Starcups",
			"address": "125 High Street, Reading, RG6 IPS",
			"rating": 3,
			"facilities": [
				"Hot drinks",
				"Food",
				"Premium wifi"
			],
			"coords": {
				"lat": 51.455041,
				"lng": -0.9690884
			},
			"openingTimes": [
				{
					"days": "Monday - Thursday",
					"opening": "7:00am",
					"closing": "7:00pm",
					"closed": false
				},
				{
					"days": "Saturday",
					"opening": "8:00am",
					"closing": "5:00pm",
					"closed": false
				},
				{
					"days": "Sunday",
					"closed": true
				}
			],
			"review": [
				{
					"author": "Simon Holmes",
					"timStamp": "16 July 2013",
					"content": "16 July 2013",
					"rating": 3,
					"reviewText": "It was okay. Coffee wasn't great, but the wifi was fast."
				},
				{
					"author": "Charlie Chaplin",
					"rating": 3,
					"timestamp": "16 June 2013",
					"reviewText": "It was okay. Coffee wasn't great, but the wifi was fast."
				},
				{
					"author": "David Dataram",
					"id": {
						"$oid": "58c02ac031d9c9325f7b5ee3"
					},
					"rating": 4,
					"timestamp": {
						"$date": "2014-03-20T04:00:00.000Z"
					},
					"reviewText": " Great place to eat. Test the new push method in mongo."
				}
			]
		};
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