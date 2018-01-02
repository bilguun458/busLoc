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
	    .when('/about', {
		templateUrl: 'about/about.view.html',
		controller: 'aboutCtrl',
        	controllerAs: 'vm'
	    })
	    .when('/why', {
		templateUrl: 'common/views/genericText.view.html',
		controller: 'whyCtrl',
		controllerAs: 'vm'
	    })
	    .otherwise({redirectTo: '/'});
    }

    var env = {};

    if(window){  
	Object.assign(env, window.__env);
    }

    angular
	.module('busLocApp')
	.config(['$routeProvider', config])
	.constant('__env', env);
    
})();


