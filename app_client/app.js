(function() {
    "use strict";
    angular.module('busLocApp', ['ngRoute']);

    config.$inject = ['$routeProvider'];
    function config ($routeProvider) {
	$routeProvider
	    .when('/', {
		templateUrl: 'home/home.view.html',
		controller: 'homeCtrl',
        	controllerAs: 'vm'
	    })
	    .when('/route', {
		templateUrl: 'route/route.view.html',
		controller: 'routeCtrl',
        	controllerAs: 'vm'
	    })
	    .when('/about', {
		templateUrl: 'common/views/genericText.view.html',
		controller: 'aboutCtrl',
        	controllerAs: 'vm'
	    })
	    .otherwise({redirectTo: '/'});
    }
    

    angular
	.module('busLocApp')
	.config(['$routeProvider', config]);
})();


