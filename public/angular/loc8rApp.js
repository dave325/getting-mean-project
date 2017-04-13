/**
 * 
 */
angular.module('loc8rApp',[]);
/*
 * Filter Section
 */

// Create the _isNumeric function 
var _isNumeric = function(n){
	return !isNaN(parseFloat(n) && isFinite(n));
}
//Create a function to tranform data
var formatDistance = function(){
	return function(distance){
		var numDistance, unit;
		if(distance && _isNumeric(distance)){
			if(distance > 1){
				// If supplied distance is over 1km, round one decimal place and add km
				numDistance = parseFloat(distance).toFixed(1);
				unit = 'km';
			}else{
				// Convert to meters and round to nearest meter before adding m unit 
				numDistance = parseInt(distance * 1000, 10);
				unit = 'm';
			}
			return numDistance + unit;
		}else{
			return "?";
		}
	}
};

/*
 * Geo location function 
 * @params: cbSuccess - Successful call
 * @params: cbError - Error 
 * @params: cbNoGeo - Not supported
 */
// 
var geoLocation = function(){
	var getPosition = function (cbSuccess, cbError, cbNoGeo){
		// check if geolocation is supported and run function
		if (navigator.geolocation){
			navigator.geolocation.getCurrentPosition(cbSuccess,cbError);
		}else{
			// if geolocation is not supported run callback
			cbNoGeo();
		}
	};
	// return the position 
	return {
		getPosition : getPosition
	};
}
/*
 * Controller Section
 */

/*
 * Define the home page 
 * @params
 * $scope - angular scope that is returned to HTML 
 * loc8rData - function that returns the information from the database
 * geoLocation - checks for the location of the user and returns a position
 */
var locationListCtrl = function($scope, loc8rData, geoLocation){
	$scope.message = "Checking your location";
	$scope.getData = function(position){
		var lat = position.coords.latitude,
			lng = position.coords.longitude;
		$scope.message = "Searching for nearby places";
		loc8rData.locationByCoords(lng,lat).then(function(data){
			if(data.status != 200){
				$scope.message = "Sorry, something went wrong";
				console.log(data);
			}else{
			$scope.data = {locations: data.data};
			$scope.message = data.data.length > 0 ?"" : "no Locations found";
			}
		});
	};
	// Displays if there is an error
	$scope.showError = function(error){
		$scope.$apply(function(){
			$scope.message = error.message;
		});
	};
	//Displays if browser does not support geolocation
	$scope.noGeo = function(){
		$scope.$apply(function(){
			$scope.message = "GeoLocation is not supported by this browser";
		});
	};
	geoLocation.getPosition($scope.getData,$scope.showError, $scope.noGeo);
};

/*
 * Adding Directives
 */

var ratingStars = function(){
	return {
		scope: {
			thisRating:'=rating'
		},
		templateUrl: "/javascripts/angular/rating-stars.html"
	};
};

/*
 * Adding services
 */
var loc8rData = function($http){
	var locationByCoords = function(lng, lat){
		return $http.get('/api/locations?lng='+lng+'&lat='+lat +'&distance=20');
	}
	return {
		locationByCoords: locationByCoords
	}
}
angular
	.module('loc8rApp')
	.controller('locationListCtrl', locationListCtrl)
	.filter('formatDistance', formatDistance)
	.directive('ratingStars', ratingStars)
	.service('loc8rData', loc8rData)
	.service('geoLocation',geoLocation);
