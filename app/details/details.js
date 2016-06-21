'use strict';

angular.module('myApp.details', ['ngRoute'])

// Declared route 
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/details', {
            templateUrl: 'details/details.html',
            controller: 'DetailCtrl'
        });
    }])

// Home controller
    .controller('DetailCtrl', ['$scope', '$rootScope', 'HttpServices', '$location', function($scope, $rootScope, HttpServices, $location) {
        console.log($location.search().ref);
        var queryString = $location.search().ref,
            cor_id = queryString[0],
            rec_id = queryString[1];

        var jsonObj = {
            module: 'history',
            postUrl: cor_id
        };
        HttpServices.get(jsonObj).then(
            function (response) {
                if(response) {
                    console.log(response);
                }
            }
        );

        jsonObj = {
            module: 'lines',
            postUrl: rec_id
        };
        HttpServices.get(jsonObj).then(
            function (response) {
                if(response) {
                    console.log(response);
                }
            }
        );
    }]);