(function(){
    "use strict";
    angular
	.module('busLocApp')
	.controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['$scope', 'transdepData', '$sce'];
    function homeCtrl($scope, transdepData, $sce) {
	var vm = this;
	vm.urlPrefix = 'https://graphhopper.com/maps/?';
	vm.urlSuffix = 'weighting=fastest&elevation=true&use_miles=false&layer=OpenStreetMap';
	
	vm.changeMapUrl = function(url) {
	    vm.mapUrl = vm.urlPrefix + url + vm.urlSuffix;
	    vm.mapUrl = $sce.trustAsResourceUrl(vm.mapUrl);
	};
	
	vm.changeMapUrl('');
	
	vm.search = function(licenseNumber) {
	    vm.pointStr = '';
	    transdepData.getBusLocation(licenseNumber)
		.then(function(response) {
		    vm.pointStr = 'point=' + response.data.lat + ',' + response.data.lon + '&';
		})
		.catch(function(response) {
		    vm.searchMessage = 'Хайлт алдаатай байна';
		    console.log(err);
		});
	    transdepData.getPointsByLNumber(licenseNumber) 
		.then(function(response) {
		    //console.log(response);
		    vm.mapPoints = response.data.points;
		    if (vm.mapPoints === undefined) {
			vm.searchMessage = 'Хайлт олдсонгүй';
		    } else {
			vm.searchMessage = 'Чиглэл: ' + response.data.from + '-' + response.data.to;
			for (var i = 0; i < vm.mapPoints.length; i++) {
			    vm.pointStr += 'point='+vm.mapPoints[i].lat+','+vm.mapPoints[i].lon+'&';
			}
			vm.changeMapUrl(vm.pointStr);
		    }
		})
		.catch(function(err) {
		    vm.searchMessage = 'Хайлт алдаатай байна ';
		    console.log(err);
		});

	};
    }
})();

//{name:'Улаанбаатар', lat:47.91901688406377, lon:106.91774368286133},{name:'Улаангом', lat:47.194379, lon:102.826538},{name:'Цэцэрлэг', lat:49.9800447.91901688406377, lon:92.068863},{name:'Хархорин', lat:48.7544, lon:98.2617}

