(function(){
    "use strict";
    angular
	.module('busLocApp')
	.controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['$scope', 'transdepData', 'googleDirection', '$sce', '$window'];
    function homeCtrl($scope, transdepData, googleDirection, $sce, $window) {
	var vm = this;
	var directionsService = new google.maps.DirectionsService;
	var directionsDisplay = new google.maps.DirectionsRenderer;
	var mapPinIcon = '/images/pin.png';
	var api_key = 'AIzaSyCjCauLhho2YsU-lRT4XZC91PIBwqhO-48';
	
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
			origin: vm.routes[i].origin.name,
			destination: vm.routes[i].destination.name,
			date: vm.routes[i].departures[j].date,
			bus: vm.routes[i].departures[j].bus
		    });
		}
	};
	
	vm.search = function(licenseNumber) {
	    transdepData.getBusLocation(licenseNumber)
		.then(function(response) {
		    vm.busLoc = response.data;
		    vm.getRemainingTime();
		})
		.catch(function(response) {
		    vm.searchMessage = 'Хайлт олдсонгүй';
		    console.log(err);
		});
	    transdepData.getPointsByLNumber(licenseNumber) 
		.then(function(response) {
		    vm.origin = response.data.origin;
		    vm.destination = response.data.destination;
		    vm.waypoints = response.data.waypoints;
		    if (vm.waypoints === undefined) {
			vm.searchMessage = 'Хайлт олдсонгүй';
		    } else {
			vm.searchMessage = 'Чиглэл: ' + response.data.origin.name + '-' + response.data.destination.name;
			vm.calculateAndDisplayRoute();
		    }
		})
		.catch(function(err) {
		    vm.searchMessage = 'Хайлт олдсонгүй';
		    console.log(err);
		});

	};

 	vm.getRemainingTime = function() {
	    // googleDirection.remainingTime((vm.busLoc.lat).toString()+','+(vm.busLoc.lon).toString(), '47.91901688406377,106.91774368286133', api_key)
	    // 	.then(function(responese) {
	    // 	    console.log(response.data);
	    // 	})
	    // 	.catch(function(err) {
	    // 	    console.log(err);
	    // 	});

	    
	    // var routeData = {
	    // 	origin: vm.busLoc.lat + ', ' + vm.busLoc.lng,
	    // 	destination: vm.destination.lat + ', ' + vm.destination.lng,
	    // 	travelMode: 'DRIVING'
	    // };
	    
	    // directionsService.route(routeData, function(response, status) {
	    // 	if (status === 'OK') {
	    // 	    console.log(response);
	    // 	} else {
	    // 	    window.alert('Directions request failed due to ' + status);
	    // 	}
	    // });
	};


	vm.calculateAndDisplayRoute = function() {
	    // var image = {
	    // 	url: mapPinIcon,
	    // 	size: new google.maps.Size(100, 100),
	    // 	origin: new google.maps.Point(0, 0),
	    // 	anchor: new google.maps.Point(17, 34),
	    // 	scaledSize: new google.maps.Size(25, 25)
	    // };
	    vm.busMarker = new google.maps.Marker({
		position: vm.busLoc,
		map: vm.map,
		title: 'Автобус',
		animation: google.maps.Animation.DROP,
		label: 'Bus',
		// symbol: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
		// icon: image
            });
	    
	    var routeData = {
		origin: vm.origin.lat + ', ' + vm.origin.lng,
		destination: vm.destination.lat + ', ' + vm.destination.lng,
		travelMode: 'DRIVING',
		waypoints: []
	    }

	    vm.waypoints.forEach(function(point) {
		routeData.waypoints.push({
		    location: point.lat + ', ' + point.lng,
		    stopover: true
		});
	    });

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

