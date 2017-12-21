(function () {
    
    angular
	.module('busLocApp')
	.filter('addHtmlLineBreaks', addHtmlLineBreaks);

    function addHtmlLineBreaks () {
	return function (text) {
	    var output = String(text).replace(/\n/g, '<br/>');
	    return output;
	};
    }

})();
