// Define Module:
var app = angular.module('app', ['ngRoute']);

// Define Routes:
app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'html/index.html', // root route partial
            controller: 'userController',
        })
        .when('/edit/:id', {
            templateUrl: 'html/edit.html',
            controller: 'editUserController',
        })
        .otherwise({
            redirectTo: '/',
        })
});
