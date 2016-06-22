'use strict';

angular.module('myApp.home', ['ngRoute'])

// Declared route 
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'home/home.html',
            controller: 'HomeCtrl'
        });
    }])

// Home controller
    .controller('HomeCtrl', ['$scope', '$rootScope', 'HttpServices', '$location', function($scope, $rootScope, HttpServices, $location) {
        console.log($rootScope.userInfo);
        var jsonObj = {
            module: 'Plist'
        };
        HttpServices.get(jsonObj).then(
            function (response) {
                if(response) {
                    $scope.pendingList = response.details;
                    $scope.pendingRecords = response.records;
                }
            }
        );

        jsonObj = {
            module: 'Tlist'
        };
        HttpServices.get(jsonObj).then(
            function (response) {
                if(response) {
                    $scope.approvedList = response.details;
                    $scope.approvedRecords = response.records;
                }
            }
        );

        $scope.tabs = [{
            title: 'Pending'
        }, {
            title: 'Approved'
        }];

        $scope.currentTab = 'Pending';

        $scope.onClickTab = function (tab) {
            $scope.currentTab = tab.title;
        };

        $scope.isActiveTab = function(title) {
            return title === $scope.currentTab;
        };

        $scope.showDetail = function (item, state) {
            var arr = state === "pending" ? $scope.pendingRecords: $scope.approvedRecords,
                rec_id = state === "pending" ? item.detail2: item.detail1;
            var u_Id = _.find(arr, function (r) { return r.summary1 == rec_id });
            item.workitem_id = u_Id.workitem_id;
            $location.path('/details').search('ref', [u_Id.cor_id, item]);
        };
    }]);