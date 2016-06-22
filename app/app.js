'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
    'ngRoute',
    'angular-loading-bar',
    'cgPrompt',
    'myApp.login',
    'myApp.home',
    'myApp.details'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
      $routeProvider.otherwise({
        redirectTo: '/login'
      });
}]);
