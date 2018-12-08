'use strict';

angular.module('ChegaMais.reservation', ['ngRoute'])
    .controller('reservationCtrl', function($scope, subscribeBackendService) {

        // Scope Variables
        //==============================
        $scope.reservations = [];

        // Controller Local Functions
        //==============================
        var loadReservations = function(){
            subscribeBackendService.getAllReservations().then(function(response){
                $scope.reservations = response;
            });
        };

        // Controller Scope Functions
        //==============================
        // $scope.addReservation = function(newReservation){
        //     $scope.reservations.push(angular.copy(newReservation));

        //     delete $scope.newReservation;
        //     $scope.reservationForm.$setPristine();
        // };
        // $scope.deleteReservation = function(reservations){
        //     $scope.reservations = reservations.filter(function (reservation) {
        //         if (!reservation.selected)
        //             return reservation;
        //     });
        // };
        // $scope.isReservationsSelected = function(reservations){
        //     return !reservations.some(function (reservation){
        //         return reservation.selected;
        //     });
        // };

        // Execution of Local Function
        //==============================
        loadReservations();
    });