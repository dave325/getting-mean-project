(function(){
	loginCtrl.$inject = ['$location', 'authentication'];
	function loginCtrl($location, authentication){
		var vm = this;
		vm.pageHeader = {
				title: 'Sign in to Loc8r'
		};
		vm.credentials = {
				name : '',
				password: ''
		};
		vm.returnPage = $location.search().page || '/';
		vm.onSubmit = function(){
			vm.formError = '';
			if(!vm.credentials || !vm.credentials.name || !vm.credentials.password){
				vm.formError = 'All fields are required, please try again';
				return;
			}else{
				vm.doLogin();
			}
		}
		vm.doLogin = function(){
			vm.formError = '';
			authentication.login(vm.credentials)
				.error(function(err){
					vm.formError = err;
				})
				.then(function(){
					$location.search('page',null);
					$location.path(vm.returnPage);
				});
		}
	}
})();