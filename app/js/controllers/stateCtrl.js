'use strict';

angular.module('ChegaMais.state', ['ngRoute'])
    .controller('stateCtrl', function($scope, subscribeBackendService) {

        // Scope Variables
        //==============================
        $scope.states = [];

        // Controller Local Functions
        //==============================
        var loadStates = function(){
            subscribeBackendService.getAllStates().then(function(response){
                $scope.states = response;
            });
        };

        // Controller Scope Functions
        //==============================
        $scope.addState = function(newState){
            $scope.states.push(angular.copy(newState));

            delete $scope.newState;
            $scope.stateForm.$setPristine();
        };
        $scope.deleteState = function(states){
            $scope.states = states.filter(function (state) {
                if (!state.selected)
                    return state;
            });
        };
        $scope.isStatesSelected = function(states){
            return !states.some(function (state){
                return state.selected;
            });
        };

        // Execution of Local Function
        //==============================
        loadStates();
    });