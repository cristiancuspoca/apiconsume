'use strict';

// Declare app level module which depends on views, and core components
angular.module('apiMovies', [
  'ngRoute',
  'ui.bootstrap',
  'apiMovies.controllersHome', 
  'apiMovies.services',
]).config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/home'});
}]);
