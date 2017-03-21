// Define Module:
var app = angular.module('app', ['ngRoute']);

// Define Routes:
app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'html/_index.html', // root route partial
            controller: 'userController',
        })
        .when('/edit/:id', {
            templateUrl: 'html/_edit.html',
            controller: 'editUserController',
        })
        .otherwise({
            redirectTo: '/',
        })
});
