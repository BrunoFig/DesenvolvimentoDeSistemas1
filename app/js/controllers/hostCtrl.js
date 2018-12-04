'use strict';

angular.module('ChegaMais.host', [])
    .controller('hostCtrl', function($scope, $http) {

        // Scope Variables
        $scope.hosts = [];
        $scope.cities = [];

        // Controller Local Functions
        var loadHosts = function(){
            $http.get("http://localhost:3000/hosts").then(function (res){
                $scope.hosts = res.data;
            }).catch(function (){
                $scope.message = "Error: " + data;
            });
        };

        var loadCities = function(){
            $http.get("http://localhost:3000/cities").then(function (res){
                $scope.cities = res.data;
            }).catch(function (){
                $scope.message = "Error: " + data;
            });
        };

        // Controller Scope Functions
        $scope.addHost = function(newHost){
            $scope.hosts.push(angular.copy(newHost));

            delete $scope.newHost;
            $scope.hostForm.$setPristine();
        };

        $scope.deleteHost = function(hosts){
            $scope.hosts = hosts.filter(function (host) {
                if (!host.selected)
                    return host;
            });
        };

        $scope.isHostsSelected = function(hosts){
            return !hosts.some(function (host){
                return host.selected;
            });
        };

        // Execution of Local Function
        loadHosts();
        loadCities();
    });