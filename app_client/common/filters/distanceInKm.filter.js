(function(){
    "use strict";
    angular
	.module('busLocApp')
	.filter('distanceInKm', distanceInKm);

    function distanceInKm() {
	return function(meters) {
	    var str = "";
	    str += Math.floor(meters/100)/10 + " км";
	    return str;
	};
    }
})();
