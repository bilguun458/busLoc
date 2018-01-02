(function(){
    "use strict";
    angular
	.module('busLocApp')
	.service('transdepData', transdepData);

    transdepData.$inject = ['$http', '__env'];
    function transdepData($http, __env) {
	var service = this;
	service.getRoutes = function() {
	    return $http.get(__env.apiUrl + 'routes');
	};
	service.getBusLocation = function(licenseNumber) {
	    return $http.get(__env.apiUrl + 'bus/'+licenseNumber);
	}
    }
})();
