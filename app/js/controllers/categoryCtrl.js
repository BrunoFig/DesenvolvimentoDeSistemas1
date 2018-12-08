'use strict';

angular.module('ChegaMais.category', ['ngRoute'])
    .controller('categoryCtrl', function($scope, subscribeBackendService) {

        // Scope Variables
        //==============================
        $scope.categories = [];

        // Controller Local Functions
        //==============================
        var loadCategories = function(){
            subscribeBackendService.getAllCategories().then(function(response){
                $scope.categories = response;
            });
        };

        // Controller Scope Functions
        //==============================
        $scope.addCategory = function(newCategory){
            subscribeBackendService.createCategory(newCategory).then(function(response){
                loadCategories();
            });

            delete $scope.newCategory;
            $scope.categoryForm.$setPristine();
        };
        $scope.deleteCategory = function(categories){
            $scope.categories = categories.filter(function (category) {
                if (!category.selected)
                    return category;
            });
        };
        $scope.isCategoriesSelected = function(categories){
            return !categories.some(function (category){
                return category.selected;
            });
        };

        // Execution of Local Function
        //==============================
        loadCategories();
    });