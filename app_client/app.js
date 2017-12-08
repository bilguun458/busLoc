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
		.otherwise({redirectTo: '/'});
	}

	angular
	.module('busLocApp')
	.config(['$routeProvider', config]);
})();