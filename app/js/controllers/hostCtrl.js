'use strict';

angular.module('ChegaMais.host', ['ngRoute'])
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
            subscribeBackendService.createHost(newHost).then(function(response){
                loadCities();
            });

            delete $scope.newHost;
            $scope.hostForm.$setPristine();
        };
        $scope.deleteHost = function(hosts){
            var toDelete = hosts.filter(function (host) {
                if (host.selected)
                    return host;
            });

            toDelete.forEach(element => {
                subscribeBackendService.deleteHost(element._id).then(function(response){
                });
            });

            loadCities();
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