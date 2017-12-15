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


window.onload = function() {

    var ghRouting = new GraphHopper.Routing({
      key: "326f0157-14d7-4b0c-8bb7-55edf7f7962b",
      vehicle: "car",
      elevation: false
    });

    ghRouting.addPoint(new GHInput(47.400905, 8.534317));
    ghRouting.addPoint(new GHInput(47.394108, 8.538265));

    ghRouting.doRequest()
      .then(function(json) {
        // Add your own result handling here
        console.log(json);
      })
      .catch(function(err) {
        console.error(err.message);
      });


 };	