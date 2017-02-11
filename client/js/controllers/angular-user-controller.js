app.controller('userController', ['$scope', 'userFactory', '$location', '$routeParams', function($scope, userFactory, $location, $routeParams) {

    // Callbacks
    var cb = {
        create: function(newUser) {
            $scope.error = '';
            $scope.person = {};
            $scope.allUsers = {};
            $scope.user = newUser;
        },
        error: function(err) {
            console.log('Errors returned from server:', err);
            $scope.error = err;
        },
        show: function(allUsers) {
            console.log(allUsers);
            $scope.allUsers = allUsers;
        },
        delete: function() {
            $scope.show();
        },
    };

    // Create User:
    $scope.create = function() {
        console.log('Create Process: Angular controller running...', $scope.person);
        userFactory.create($scope.person, cb.create, cb.error);
    };

    // Show Users:
    $scope.show = function() {
        console.log('Showing all users...');
        userFactory.show(cb.show);
    };

    // Delete User:
    $scope.delete = function(user) {
        console.log('DELETING USER');
        userFactory.delete(user, cb.delete);
    };

}]);
