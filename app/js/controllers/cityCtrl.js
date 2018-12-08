'use strict';

angular.module('ChegaMais.city', ['ngRoute'])
    .controller('cityCtrl', function($scope, subscribeBackendService) {

        // Scope Variables
        //==============================
        $scope.cities = [];
        $scope.states = [];

        // Controller Local Functions
        //==============================
        var loadCities = function(){
            subscribeBackendService.getAllCities().then(function(response){
                $scope.cities = response;
            });
        };
        var loadStates = function(){
            subscribeBackendService.getAllStates().then(function(response){
                $scope.states = response;
            });
        };

        // Controller Scope Functions
        //==============================
        $scope.addCity = function(newCity){
            subscribeBackendService.createCity(newCity).then(function(response){
                loadCities();
            });

            delete $scope.newCity;
            $scope.cityForm.$setPristine();
        };
        $scope.deleteCity = function(cities){
            $scope.cities = cities.filter(function (city) {
                if (!city.selected)
                    return city;
            });
        };
        $scope.isCitiesSelected = function(cities){
            return !cities.some(function (city){
                return city.selected;
            });
        };

        // Execution of Local Function
        //==============================
        loadCities();
        loadStates();
    });