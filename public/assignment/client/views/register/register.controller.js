(function() {
    "use strict";
    angular.module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $location, $rootScope, UserService) {

        $scope.register = function() {

            //Validate fields
            if ($scope.username !== undefined && $scope.password == $scope.verify_password && $scope.email !== undefined && $scope.password !== undefined && $scope.verify_password !== undefined) {

                var user = {
                    username: $scope.username,
                    password: $scope.password,
                    email: $scope.email
                };

                UserService.createUser(user).then(function(new_user){
                    $rootScope.user = new_user;
                    $location.path("/profile");
                });
            }

        };
    }
})();
