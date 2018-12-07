'use strict';

angular.module('ChegaMais.items', ['ngRoute'])
    .controller('itemsCtrl', function($scope, subscribeBackendService) {

        // Scope Variables
        //==============================
        $scope.itemss = [];

        // Controller Local Functions
        //==============================
        var loadItems = function(){
            subscribeBackendService.getAllItems().then(function(response){
                $scope.itemss = response;
            });
        };

        // Controller Scope Functions
        //==============================
        $scope.addItem = function(newItem){
            $scope.itemss.push(angular.copy(newItem));

            delete $scope.newItem;
            $scope.itemsForm.$setPristine();
        };
        $scope.deleteItem = function(itemss){
            $scope.itemss = itemss.filter(function (items) {
                if (!items.selected)
                    return items;
            });
        };
        $scope.isItemsSelected = function(itemss){
            return !itemss.some(function (items){
                return items.selected;
            });
        };

        // Execution of Local Function
        //==============================
        loadItems();
    });