(function() {

    angular
	.module('busLocApp')
	.controller('aboutCtrl', aboutCtrl);

    aboutCtrl.$inject = ['$sce'];
    function aboutCtrl($sce) {
	var vm = this;


	vm.main = {
	    title: 'BusLocation Тухай',
	    content: 'Хэрэглэгчийн шаардлага: \n* Хэрэглэгч хот хоорондын тодорхой чиглэл дэх суурингуудын байршлыг газрын зураг дээр дүрсэлсэн байдлаар харах боломжтой байх \n* Хэрэглэгч хот хоорондын зорчих тээврийн хэрэгслийн улсын бүртгэлийн дугаараар хайлт хийнэ сүүлд бүртгэгдсэн байршлыг газрын зураг дээрээс харах боломжтой байх \n * Хэрэглэгч тээврийн хэрэгслүүдийн улсын бүртгэлийн дугаарыг зорчих чиглэл болон хөдлөх огноогоор нь шүүлт хийж  харах боломжтой байх'
	};

	vm.main.title = $sce.trustAsHtml(vm.main.title);
	vm.main.content = $sce.trustAsHtml(vm.main.content.replace(/\n/g, '<br/>'));
    }
})();


