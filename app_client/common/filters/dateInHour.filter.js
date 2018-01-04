(function(){
    "use strict";
    angular
	.module('busLocApp')
	.filter('dateInHour', dateInHour);

    function dateInHour() {
	return function(seconds) {
	    var str = "";
	    str += Math.floor(seconds/3600) + " цаг";
	    if (Math.floor((seconds - 3600 * Math.floor(seconds/3600))/900)) str += " " + Math.floor((seconds - 3600 * Math.floor(seconds/3600))/900) * 15 + " минут"; 
	    return str;
	};
    }
})();
