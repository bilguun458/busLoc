(function() {

    angular
	.module('busLocApp')
	.controller('aboutCtrl', aboutCtrl);

    aboutCtrl.$inject = ['$sce'];
    function aboutCtrl($sce) {
	var vm = this;


	vm.main = {
	    title: 'Автотээврийн үндэсний төвийн системээс авах өгөгдлийн талаар'
	}
	vm.main.title = $sce.trustAsHtml(vm.main.title);
	vm.main.content = $sce.trustAsHtml(vm.main.content.replace(/\n/g, '<br/>'));
    }
})();


