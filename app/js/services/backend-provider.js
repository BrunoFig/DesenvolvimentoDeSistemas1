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
            categories: backend + "/categories",
            cities: backend + "/cities",
            hosts: backend + "/hosts",
            hostsTypes: backend + "/hostTypes",
            items: backend + "/items",
            reservations: backend + "/reservations",
            users: backend + "/users",
            states: backend + "/states",
        };

        return {
            //     ###  Category  ###
            //============================
            getAllCategories: function () {
                return $http({
                    method: "GET",
                    url: endpoints.categories
                }).then(function success(response) {
                    return response.data;
                }, function error(response) {
                    console.log(response);
                });
            },
            createCategory: function (roleObj) {
                return $http({
                    method: "POST",
                    url: endpoints.categories,
                    data: roleObj
                }).then(function success(response) {
                    return response;
                }, function error(response) {
                    console.log(response);
                })
            },
            deleteCategory: function (objId) {
                return $http({
                    method: "DELETE",
                    url: endpoints.categories + objId
                }).then(function success(response) {
                    return response;
                }, function error(response) {
                    console.log(response);
                })
            },
            //     ###  City  ###
            //============================
            getAllCities: function () {
                return $http({
                    method: "GET",
                    url: endpoints.cities
                }).then(function success(response) {
                    return response.data;
                }, function error(response) {
                    console.log(response);
                })
            },
            createCity: function (roleObj) {
                return $http({
                    method: "POST",
                    url: endpoints.cities,
                    data: roleObj
                }).then(function success(response) {
                    return response;
                }, function error(response) {
                    console.log(response);
                })
            },
            deleteCity: function (objId) {
                return $http({
                    method: "DELETE",
                    url: endpoints.cities + objId
                }).then(function success(response) {
                    return response;
                }, function error(response) {
                    console.log(response);
                })
            },
            //     ###  Host  ###
            //============================
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
            createHost: function (roleObj) {
                return $http({
                    method: "POST",
                    url: endpoints.hosts,
                    data: roleObj
                }).then(function success(response) {
                    return response;
                }, function error(response) {
                    console.log(response);
                })
            },
            deleteHost: function (objId) {
                return $http({
                    method: "DELETE",
                    url: endpoints.hosts + objId
                }).then(function success(response) {
                    return response;
                }, function error(response) {
                    console.log(response);
                })
            },
            //     ###  Host Type  ###
            //============================
            getAllHostsTypes: function () {
                return $http({
                    method: "GET",
                    url: endpoints.hostsTypes
                }).then(function success(response) {
                    return response.data;
                }, function error(response) {
                    console.log(response);
                });
            },createHostType: function (roleObj) {
                return $http({
                    method: "POST",
                    url: endpoints.hostsTypes,
                    data: roleObj
                }).then(function success(response) {
                    return response;
                }, function error(response) {
                    console.log(response);
                })
            },
            deleteHostType: function (objId) {
                return $http({
                    method: "DELETE",
                    url: endpoints.hostsTypes + objId
                }).then(function success(response) {
                    return response;
                }, function error(response) {
                    console.log(response);
                })
            },
            //     ###  Item  ###
            //============================
            getAllItems: function () {
                return $http({
                    method: "GET",
                    url: endpoints.items
                }).then(function success(response) {
                    return response.data;
                }, function error(response) {
                    console.log(response);
                });
            },
            createItem: function (roleObj) {
                return $http({
                    method: "POST",
                    url: endpoints.items,
                    data: roleObj
                }).then(function success(response) {
                    return response;
                }, function error(response) {
                    console.log(response);
                })
            },
            deleteItem: function (objId) {
                return $http({
                    method: "DELETE",
                    url: endpoints.items + objId
                }).then(function success(response) {
                    return response;
                }, function error(response) {
                    console.log(response);
                })
            },
            //     ###  Reservation  ###
            //============================
            getAllReservations: function () {
                return $http({
                    method: "GET",
                    url: endpoints.reservations
                }).then(function success(response) {
                    return response.data;
                }, function error(response) {
                    console.log(response);
                });
            },
            createReservation: function (roleObj) {
                return $http({
                    method: "POST",
                    url: endpoints.reservations,
                    data: roleObj
                }).then(function success(response) {
                    return response;
                }, function error(response) {
                    console.log(response);
                })
            },
            deleteReservation: function (objId) {
                return $http({
                    method: "DELETE",
                    url: endpoints.reservations + objId
                }).then(function success(response) {
                    return response;
                }, function error(response) {
                    console.log(response);
                })
            },
            //     ###  User  ###
            //============================
            getAllUsers: function () {
                return $http({
                    method: "GET",
                    url: endpoints.users
                }).then(function success(response) {
                    return response.data;
                }, function error(response) {
                    console.log(response);
                });
            },
            createUser: function (roleObj) {
                return $http({
                    method: "POST",
                    url: endpoints.users,
                    data: roleObj
                }).then(function success(response) {
                    return response;
                }, function error(response) {
                    console.log(response);
                })
            },
            deleteUser: function (objId) {
                return $http({
                    method: "DELETE",
                    url: endpoints.users + objId
                }).then(function success(response) {
                    return response;
                }, function error(response) {
                    console.log(response);
                })
            },
            //     ###  State  ###
            //============================
            getAllStates: function () {
                return $http({
                    method: "GET",
                    url: endpoints.states
                }).then(function success(response) {
                    return response.data;
                }, function error(response) {
                    console.log(response);
                });
            },
            createState: function (roleObj) {
                console.log(roleObj);
                return $http({
                    method: "POST",
                    url: endpoints.states,
                    data: roleObj
                }).then(function success(response) {
                    return response;
                }, function error(response) {
                    console.log(response);
                })
            },
            deleteState: function (objId) {
                return $http({
                    method: "DELETE",
                    url: endpoints.states + objId
                }).then(function success(response) {
                    return response;
                }, function error(response) {
                    console.log(response);
                })
            }
        };
    })





