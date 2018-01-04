(function(){
    "use strict";
    angular
	.module('busLocApp')
	.service('transdepData', transdepData);

    transdepData.$inject = ['$http', '__env'];
    function transdepData($http, __env) {
	var service = this;
	service.getRoutes = function() {
	    return $http.get(__env.routeApiUrl);
	};
	service.getBusLocation = function(licenseNumber) {
	    return $http.get(__env.busApiUrl +licenseNumber);
	}
    }
})();
