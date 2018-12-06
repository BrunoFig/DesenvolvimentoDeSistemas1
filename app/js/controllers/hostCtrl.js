'use strict';

angular.module('ChegaMais.host', [])
    .controller('hostCtrl', function($scope, subscribeBackendService) {

        // Scope Variables
        //==============================
        $scope.hosts = [];
        $scope.cities = [];

        // Controller Local Functions
        //==============================
        var loadHosts = function(){
            subscribeBackendService.getAllHosts().then(function(response){
                $scope.hosts = response;
            });
        };
        var loadCities = function(){
            subscribeBackendService.getAllCities().then(function(response){
                $scope.cities = response;
            });
        };

        // Controller Scope Functions
        //==============================
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
        //==============================
        loadHosts();
        loadCities();
    });