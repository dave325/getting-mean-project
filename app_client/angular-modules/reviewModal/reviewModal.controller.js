(function(){
	reviewModalCtrl.$inject = ['$uibModalInstance', 'loc8rData', 'locationData'];
	function reviewModalCtrl($uibModalInstance, loc8rData,  locationData){
		var vm = this;
		vm.locationData = locationData;
		vm.cancel = function(){
			
					$uibModalInstance.dismiss('cancel')
		}
		vm.close = function(result){
			$uibModalInstance.close(result);
		}
		vm.doAddReview = function(locationid, formData){
			loc8rData.addReviewById(locationid, {
				author : formData.name,
				rating: formData.rating,
				reviewText : formData.reviewText
			})
			.then(function(data){
				console.log('Success');
				vm.close(data);
			},
			function(data){
				console.log();
				vm.formError = 'Your review has not been saved, try again'
			});
			return false;
		}
		vm.onSubmit = function(){
			vm.formError = '';
			if(!vm.formData || !vm.formData.name || !vm.formData.rating || !vm.formData.reviewText){
				vm.formError = "All fields are required, please try again";
				return false;
			}else{
				vm.doAddReview(vm.locationData.locationid, vm.formData)
				return false;
			}
		}
		
	}
	angular.module('loc8rApp')
		.controller('reviewModalCtrl', reviewModalCtrl);
})();