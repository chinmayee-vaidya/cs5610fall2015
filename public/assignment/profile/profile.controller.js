(function() {
    "use strict";
    angular.module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, UserService) {

        //set the models using rootScope.user
        if($rootScope.user !== undefined){
            $scope.username = $rootScope.user.username;
            $scope.password = $rootScope.user.password;
            $scope.firstname = $rootScope.user.firstname;
            $scope.lastname = $rootScope.user.lastname;
            $scope.email = $rootScope.user.email;
        }

        $scope.update = function() {

            //Validate user
            var updated_user = {
                username: $scope.username,
                password: $scope.password,
                firstname: $scope.firstname,
                lastname: $scope.lastname,
                email: $scope.email
            };

            UserService.updateUser($rootScope.user.user_id, updated_user, function(updated) {

                //now set the models to new names
                $rootScope.user = updated;

                $scope.username = $rootScope.user.username;
                $scope.password = $rootScope.user.password;
                $scope.firstname = $rootScope.user.firstname;
                $scope.lastname = $rootScope.user.lastname;
                $scope.email = $rootScope.user.email;

            });
        };

    }
})();
