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
            subscribeBackendService.createState(newState).then(function(response){
                loadStates();
            });

            delete $scope.newState;
            $scope.stateForm.$setPristine();
        };
        $scope.deleteState = function(states){
            var toDelete = states.filter(function (state) {
                if (state.selected)
                    return state;
            });

            toDelete.forEach(element => {
                subscribeBackendService.deleteState(element._id).then(function(response){
                });
            });

            loadStates();
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