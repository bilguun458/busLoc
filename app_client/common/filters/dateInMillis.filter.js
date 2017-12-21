(function(){
    "use strict";
    angular
	.module('busLocApp')
	.filter('dateInMillis', dateInMillis);

    function dateInMillis() {
	return function(dateString) {
	    return Date.parse(dateString);
	};
    }
})();
