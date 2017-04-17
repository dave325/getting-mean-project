(function(){
angular.module('loc8rApp')
	.filter('formatDistance', formatDistance);
//Create the _isNumeric function 
var _isNumeric = function(n){
	return !isNaN(parseFloat(n) && isFinite(n));
}
//Create a function to tranform data
function formatDistance (){
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
})();