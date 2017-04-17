(function(){
	locationDetailCtrl.$inject = ['$routeParams', '$uibModal', 'loc8rData'];
	function locationDetailCtrl ($routeParams, $modal,  loc8rData){
		var vm = this;
		vm.locationid = $routeParams.locationid
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
			var modalInstance = $modal.open({
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
				console.log("result " + data);
				vm.data.location.reviews.push(data);
			});
		}
	}
	angular.module('loc8rApp')
		.controller('locationDetailCtrl',locationDetailCtrl);
})();