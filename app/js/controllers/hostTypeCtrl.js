'use strict';

angular.module('ChegaMais.hostType', ['ngRoute'])
    .controller('hostTypeCtrl', function($scope, subscribeBackendService) {

        // Scope Variables
        //==============================
        $scope.hostTypes = [];

        // Controller Local Functions
        //==============================
        var loadHostTypes = function(){
            subscribeBackendService.getAllHostsTypes().then(function(response){
                $scope.hostTypes = response;
            });
        };

        // Controller Scope Functions
        //==============================
        $scope.addHostType = function(newHostType){
            subscribeBackendService.createHostType(newHostType).then(function(response){
                loadHostTypes();
            });

            delete $scope.newHostType;
            $scope.hostTypeForm.$setPristine();
        };
        $scope.deleteHostType = function(hostTypes){
            $scope.hostTypes = hostTypes.filter(function (hostType) {
                if (!hostType.selected)
                    return hostType;
            });
        };
        $scope.isHostTypesSelected = function(hostTypes){
            return !hostTypes.some(function (hostType){
                return hostType.selected;
            });
        };

        // Execution of Local Function
        //==============================
        loadHostTypes();
    });