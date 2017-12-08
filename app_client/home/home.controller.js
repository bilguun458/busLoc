(function(){
	"use strict";
	angular
	.module('busLocApp')
	.controller('homeCtrl', homeCtrl);

	homeCtrl.$inject = ['$scope', 'transdepData'];
	function homeCtrl($scope, transdepData) {
		var vm = this;
		vm.message = "It is working";
		vm.getStations = function() {
			var promise = transdepData.getStations();
			promise
			.then(function(response) {
				console.log(response);
			})
			.catch(function(err) {
				console.log(err);
			});
		}
		vm.getStations();
	}
})();