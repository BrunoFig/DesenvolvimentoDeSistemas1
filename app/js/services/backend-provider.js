'use strict';

angular.module('ChegaMais.backendService', [])

/**
 * HTTP Module for Subscribe Page
 * Subscribe Service Provider
 */
    .factory('subscribeBackendService', function ($http) {

        var link = "http://localhost";
        var port = ":3000";
        var backend = link + port;

        var endpoints = {
            hosts: backend + "/backend/hosts",
            cities: backend + "/backend/cities",
        };

        return {
            getAllHosts: function () {
                return $http({
                    method: "GET",
                    url: endpoints.hosts
                }).then(function success(response) {
                    return response.data;
                }, function error(response) {
                    console.log(response);
                });
            },
            getAllCities: function () {
                return $http({
                    method: "GET",
                    url: endpoints.cities
                }).then(function success(response) {
                    return response.data;
                }, function error(response) {
                    console.log(response);
                })
            }
        };
    })





