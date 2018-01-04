(function () {

    angular
	.module('busLocApp')
	.directive('timeline', timeline);

    function timeline () {
	return {
	    restrict: 'EA',
	    scope: {
		elapsed: '=',
		remaining: '=',
		route: '='
	    },
	    templateUrl: '/common/directives/timeline/timeline.template.html',
	};
    }

})();
