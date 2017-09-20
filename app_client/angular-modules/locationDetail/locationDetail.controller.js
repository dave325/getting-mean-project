(function(){
	locationDetailCtrl.$inject = ['$routeParams', '$location', '$uibModal', 'loc8rData', 'authentication'];
	function locationDetailCtrl ($routeParams, $location, $uibmodal,  loc8rData, authentication){
		var vm = this;
		vm.locationid = $routeParams.locationid;
		vm.isLoggedIn = authentication.isLoggedIn();
		vm.currentPath = $location.path();
		loc8rData.getLocationById(vm.locationid)
			.then(function(data){
				vm.data = {location: data.data};
				vm.pageHeader = {
						title: vm.data.location.name
				}
				console.log(vm.data);
			}, function(data){
				console.log(data);
			}
		)
		vm.popupReviewForm = function(){
			var modalInstance = $uibmodal.open({
				templateUrl:'/angular-modules/reviewModal/reviewModal.view.html',
				controller: 'reviewModalCtrl',
				controllerAs:'vm',
				resolve: {
					locationData : function(){
						return {
							locationid: vm.locationid,
							locationName: vm.data.location.name
						};
					}
				}
			})
			modalInstance.result.then(function(data){
				console.log(data.data);
				vm.data.location.reviews.push(data.data);
			});
		}
	}
	angular.module('loc8rApp')
		.controller('locationDetailCtrl',locationDetailCtrl);
})();