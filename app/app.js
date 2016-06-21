'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
    'ngRoute',
    'myApp.login',
    'myApp.home',
    'myApp.details'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
      $routeProvider.otherwise({
        redirectTo: '/login'
      });
}]);
