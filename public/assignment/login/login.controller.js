(function() {
    "use strict";
    angular.module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $location, $rootScope, UserService) {

        $scope.login = function() {

            //Validate user
            UserService.findUserByUsernameAndPassword($scope.username, $scope.password, function(user) {
                if (user !== null) {
                    $rootScope.user = user;
                    $location.path("/profile");
                }
            });
        };
    }
})();
