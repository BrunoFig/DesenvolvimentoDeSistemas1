'use strict';

angular.module('ChegaMais.item', ['ngRoute'])
    .controller('itemCtrl', function($scope, subscribeBackendService) {

        // Scope Variables
        //==============================
        $scope.items = [];

        // Controller Local Functions
        //==============================
        var loadItems = function(){
            subscribeBackendService.getAllItems().then(function(response){
                $scope.items = response;
            });
        };

        // Controller Scope Functions
        //==============================
        $scope.addItem = function(newItem){
            subscribeBackendService.createItem(newItem).then(function(response){
                loadItems();
            });

            delete $scope.newItem;
            $scope.itemsForm.$setPristine();
        };
        $scope.deleteItem = function(items){
            $scope.items = items.filter(function (items) {
                if (!items.selected)
                    return items;
            });
        };
        $scope.isItemsSelected = function(items){
            return !items.some(function (items){
                return items.selected;
            });
        };

        // Execution of Local Function
        //==============================
        loadItems();
    });