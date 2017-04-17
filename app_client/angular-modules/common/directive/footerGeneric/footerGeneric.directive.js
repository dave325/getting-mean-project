(function(){
angular.module('loc8rApp')
	.directive('footerGeneric', footerGeneric);

function footerGeneric(){
	return{
		restrict:'EA',
		templateUrl:'/angular-modules/common/directive/footerGeneric/footerGeneric.template.html'
	}
}

})();