'use strict';

angular.module('apiMovies').directive("itemInfo", [function() {
	return {
		restrict: 'E',
		scope: {
			item: '=item',
			clickOn: '&'
		},
      	templateUrl: 'home/directive_item_api.html'
	};
}]);


angular.module('apiMovies').directive('modalDialog', function($templateCache, $compile, $http) {
    return {
        restrict: 'EA',
        scope: {
            showopen: '=',
            itemselect: '=itemselect',
        	templateUri: '@'
        },
        replace: true,
        link: function(scope, element, attrs) {
          	$http.get(scope.templateUri, {cache: $templateCache})
          		.then(function(tplContent){
          			// console.log(tplContent);
                	element.replaceWith($compile(tplContent.data)(scope));                
          		});
                  
          	scope.stylesModal = {};  	
            
          	scope.closeModal = function() {
            	scope.showopen = false;        	
          	};
        }
    };
});