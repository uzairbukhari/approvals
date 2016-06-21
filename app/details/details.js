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
        var queryString = $location.search().ref,
            cor_id = queryString[0],
            rec_obj = queryString[1];

        if(_.isString(rec_obj))
            $location.path('/home').search('','');

        $scope.record = rec_obj;
        console.log(rec_obj);
        var jsonObj = {
            module: 'history',
            postUrl: cor_id
        };
        HttpServices.get(jsonObj).then(
            function (response) {
                if(response) {
                    $scope.history = response.HList;
                    console.log(response);
                }
            }
        );

        jsonObj = {
            module: 'lines',
            postUrl: rec_obj.detail2
        };
        HttpServices.get(jsonObj).then(
            function (response) {
                if(response) {
                    $scope.lines = response.lines;
                    console.log(response);
                }
            }
        );
    }]);