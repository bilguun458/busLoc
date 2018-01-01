(function(){
    "use strict";
    angular
	.module('busLocApp')
	.controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['$scope', 'transdepData', '$sce', '$window'];
    function homeCtrl($scope, transdepData, $sce, $window) {
	var vm = this;

	transdepData.getRoutes()
	    .then(function(response) {
		vm.routes = response.data;
		vm.parseData();
	    })
	    .catch(function(err) {
		console.log(err);
	    });

	vm.parseData = function() {
	    vm.departures = [];
	    for (var i = 0; i < vm.routes.length; i++)
		for (var j = 0; j < vm.routes[i].departures.length; j++) {
		    vm.departures.push({
			origin: vm.routes[i].from,
			destination: vm.routes[i].to,
			date: vm.routes[i].departures[j].date,
			bus: vm.routes[i].departures[j].bus
		    });
		}
	    console.log(vm.routes);
	    console.log(vm.departures);
	};
	var directionsService = new google.maps.DirectionsService;
	var directionsDisplay = new google.maps.DirectionsRenderer;
	var busIcon = '/images/bus.png';
	//vm.urlPrefix = 'https://graphhopper.com/maps/?';
	//vm.urlSuffix = 'weighting=fastest&elevation=true&use_miles=false&layer=OpenStreetMap';
	
	// vm.changeMapUrl = function(url) {
	//     vm.mapUrl = vm.urlPrefix + url + vm.urlSuffix;
	//     vm.mapUrl = $sce.trustAsResourceUrl(vm.mapUrl);
	// };
	
	// vm.changeMapUrl('');

	// vm.generatePointStr = function() {
	//     for (var i = 0; i < vm.mapPoints.length; i++) {
	// 	vm.pointStr += 'point='+vm.mapPoints[i].lat+','+vm.mapPoints[i].lon+'&';
	//     }
	//     vm.changeMapUrl(vm.pointStr);
	// };
	
	vm.search = function(licenseNumber) {
	    vm.pointStr = '';
	    transdepData.getBusLocation(licenseNumber)
		.then(function(response) {
		    vm.busLoc = response.data;
		    // vm.pointStr = 'point=' + response.data.lat + ',' + response.data.lon + '&';
		})
		.catch(function(response) {
		    vm.searchMessage = 'Хайлт олдсонгүй';
		    console.log(err);
		});
	    transdepData.getPointsByLNumber(licenseNumber) 
		.then(function(response) {
		    //console.log(response);
		    vm.waypoints = response.data.points;
		    if (vm.waypoints === undefined) {
			vm.searchMessage = 'Хайлт олдсонгүй';
		    } else {
			vm.searchMessage = 'Чиглэл: ' + response.data.from + '-' + response.data.to;
			vm.calculateAndDisplayRoute();
			// vm.generatePointStr();
		    }
		})
		.catch(function(err) {
		    vm.searchMessage = 'Хайлт олдсонгүй';
		    console.log(err);
		});

	};








	vm.calculateAndDisplayRoute = function() {
	    vm.busMarker = new google.maps.Marker({
		position: {lat:47.34789552369882,lng:104.29183959960939},
		map: vm.map,
		title: 'Автобус',
		icon: busIcon
            });
	    
	    var routeData = {
		origin: vm.waypoints[0].lat.toString() + ', ' + vm.waypoints[0].lon.toString(),
		destination: vm.waypoints[vm.waypoints.length-1].lat.toString() + ', ' + vm.waypoints[vm.waypoints.length-1].lon.toString(),
		travelMode: 'DRIVING',
		waypoints: []
	    }

	    for(var i = 1; i < vm.waypoints.length; i++) {
		routeData.waypoints.push({
		    location: vm.waypoints[i].lat.toString() + ', ' + vm.waypoints[i].lon.toString(),
		    stopover: true
		});
	    }
	    directionsService.route(routeData, function(response, status) {
		if (status === 'OK') {
		    directionsDisplay.setDirections(response);
		} else {
		    window.alert('Directions request failed due to ' + status);
		}
	    });

	}

	$window.initMap = function() {
	    vm.map = new google.maps.Map(document.getElementById('map'), {
		zoom: 7,
		center: {lat:47.918958, lng: 106.917622}
	    });
	    directionsDisplay.setMap(vm.map);

	};
	$window.initMap();

	
    }
})();

//{name:'Улаанбаатар', lat:47.91901688406377, lon:106.91774368286133},{name:'Улаангом', lat:47.194379, lon:102.826538},{name:'Цэцэрлэг', lat:49.9800447.91901688406377, lon:92.068863},{name:'Хархорин', lat:48.7544, lon:98.2617}

