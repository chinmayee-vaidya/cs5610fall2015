(function() {
    "use strict";
    angular.module("HotelApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $location, $rootScope, UserService) {

        var model=this;
        model.login=login;

        function login(user){
            var username=model.user.username;
            var password=model.user.password;

            UserService.findUserByUsernameAndPassword(username, password).then(function(user){
                console.log(user[0]);
                if (user !== null) {
                    $rootScope.user = user[0];
                    //console.log("Login"+user);
                    var current=user[0];
                    console.log("Current");
                    console.log(current);
                    var uid=current._id;
                    $location.path("/profile/"+uid);
                }
            });
        }



        /*$scope.login = function() {

            //Validate user
            UserService.findUserByUsernameAndPassword($scope.username, $scope.password).then(function(user){
                if (user !== null) {
                    $rootScope.user = user;
                    $location.path("/profile");
                }
            });
        };*/

}
})();
