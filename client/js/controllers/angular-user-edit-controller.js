app.controller('editUserController', ['$scope', 'userFactory', '$location', '$routeParams', function($scope, userFactory, $location, $routeParams) {

    // Callbacks:
    var cb = {
        findOne: function(foundUser) {
            $scope.user = foundUser;
        },
        update: function() {
            $location.url('/');
        },
        error: function(err) {
            $scope.errors = err;
            $scope.findOne();
        },
    };

    // Find User For Editing based on URL id:
    $scope.findOne = function() {
        userFactory.findOne($routeParams.id, cb.findOne);
    };

    // Finds User when 'html/edit.html' is loaded:
    $scope.findOne()

    // Update User:
    $scope.update = function() {
        console.log($scope.user);
        userFactory.update($routeParams.id, $scope.user, cb.update, cb.error)
    };

    // Cancel Edit:
    $scope.cancel = function() {
        $location.url('/');
    };

}]);
