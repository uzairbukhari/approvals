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
        console.log('in home');
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
            title: 'Pending',
            url: 'pending.tpl.html'
        }, {
            title: 'Approved',
            url: 'approved.tpl.html'
        }];

        $scope.currentTab = 'pending.tpl.html';

        $scope.onClickTab = function (tab) {
            $scope.currentTab = tab.url;
        };

        $scope.isActiveTab = function(tabUrl) {
            return tabUrl == $scope.currentTab;
        };

        $scope.showDetail = function (item, state) {
            var arr = state == "pending" ? $scope.pendingRecords: $scope.approvedRecords;
            var u_Id = _.find(arr, function (r) { return r.summary1 == item.detail2 })
            $location.path('/details').search('ref', [u_Id.cor_id, item]);
        };
    }]);