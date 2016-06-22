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
    .controller('DetailCtrl', ['$scope', '$rootScope', 'HttpServices', '$location', 'prompt', function($scope, $rootScope, HttpServices, $location, prompt) {
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

        $scope.onActionClick = function (isApproved) {
            prompt({
                "title": "Purchase Order Approval",
                "message": "Enter your comments for Purchase Order",
                "input": true,
                "label": "comments (required)",
                "value": "",
                "buttons": [
                    {
                        "label": "Comment",
                        "cancel": false,
                        "primary": true
                    },
                    {
                        "label": "Cancel",
                        "cancel": true,
                        "primary": false
                    }
                ]
            }).then(function(result){
                if(isApproved) {
                    jsonObj = {
                        module: 'approve',
                        param: {
                            id: '{' + rec_obj.workitem_id + '}',
                            comment: '{' + result + '}'
                        }
                    };
                } else {
                    jsonObj = {
                        module: 'reject',
                        param: {
                            id: '{' + rec_obj.workitem_id + '}',
                            comment: '{' + result + '}'
                        }
                    };
                }
                HttpServices.get(jsonObj).then(
                    function (response) {
                        if(response) {
                            console.log(response);
                            $location.path('/home').search('','');
                        }
                    }
                );
            });
        };
    }]);