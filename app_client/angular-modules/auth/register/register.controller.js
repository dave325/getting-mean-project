(function(){
	registerCtrl.$inject = ['$location', 'authentication'];
	function registerCtrl($location, authentication){
		var vm = this;
		vm.pageHeader = {
				title: 'Create a new Loc8r Account'
		};
		vm.credentials = {
				name: "",
				email:"",
				password:""
		};
		// Get the page to return to
		vm.returnPage = $location.search().page ||'/';
		vm.onSubmit = function(){
			vm.formError = '';
			if(!vm.credentials || !vm.credentials.name || !vm.credentials.email || !vm.credentials.password){
				vm.formError = "All fields required, please try again";
				return false;
			}else{
				vm.doRegister();
			}
		};
		vm.doRegister = function(){
			vm.formError = '';
			authentication.register(vm.credentials)
				.then(function(){
					$location.search('page', null);
					$location.path(vm.returnPage);
				},function(err){
					vm.formError = err;
				});
		};
	}
	angular.module('loc8rApp')
		.controller('registerCtrl', registerCtrl);
})();