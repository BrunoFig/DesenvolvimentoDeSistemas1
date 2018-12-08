'use strict';

angular.module('ChegaMais.user', ['ngRoute'])
    .controller('userCtrl', function($scope, subscribeBackendService) {

        // Scope Variables
        //==============================
        $scope.users = [];

        // Controller Local Functions
        //==============================
        var loadUsers = function(){
            subscribeBackendService.getAllUsers().then(function(response){
                $scope.users = response;
            });
        };

        // Controller Scope Functions
        //==============================
        $scope.addUser = function(newUser){
            subscribeBackendService.createUser(newUser).then(function(response){
                loadUsers();
            });

            delete $scope.newUser;
            $scope.userForm.$setPristine();
        };
        $scope.deleteUser = function(users){
            $scope.users = users.filter(function (user) {
                if (!user.selected)
                    return user;
            });
        };
        $scope.isUsersSelected = function(users){
            return !users.some(function (user){
                return user.selected;
            });
        };

        // Execution of Local Function
        //==============================
        loadUsers();
    });