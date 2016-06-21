'use strict';

angular.module('myApp.login', ['ngRoute'])

// Declared route 
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'login/login.html',
            controller: 'LoginCtrl'
        });
    }])

// Home controller
    .controller('LoginCtrl', ['$scope', '$rootScope', 'HttpServices','$location', function($scope, $rootScope, HttpServices, $location) {
        $scope.info = {};

        $scope.authUser = function () {
            var jsonObj = {
                module: 'login',
                data: $scope.info
            };
            HttpServices.set(jsonObj).then(
                function (response) {
                    $rootScope.userInfo = response;
                    Helper.setCookie('auth_token', response.auth_token);
                    $location.path('/home');
                }
            );
        };
    }]);