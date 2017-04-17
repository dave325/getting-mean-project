(function(){
	
	function aboutCtrl(){
		var vm = this;
		vm.pageHeader = {
			title:'About Loc8r'
		};
		vm.main = {
				content : 'Loc8r was created \n two days ago'
		};
	}
	angular.module('loc8rApp')
		.controller('aboutCtrl', aboutCtrl);
})();