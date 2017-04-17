(function(){
angular.module('loc8rApp')
	.service('geolocation',geolocation);
	
function geolocation(){
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
})();