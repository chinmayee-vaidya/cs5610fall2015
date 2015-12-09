(function() {
    "use strict";
    angular.module("HotelApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $rootScope, $location, $cookieStore) {

        var model = this;

        $rootScope.loggedIn = $cookieStore.get("loggedin");
        //console.log("Logged in");
        //console.log($rootScope.loggedIn);
        if ($rootScope.loggedIn !== false) {
            $rootScope.loggedOut = "";
            $rootScope.user = $rootScope.loggedIn;
        } else {
            $rootScope.loggedOut = true;
        }

        $scope.$location = $location;
        $scope.isAdmin = function() {
            if ($rootScope.user.username === "adminadmin" && $rootScope.user.password === "adminadmin")
                return true;
            else {
                return false;
            }
        }



        $scope.logout = function() {
            $rootScope.user = undefined;
            $cookieStore.put("loggedin", false);
            $location.path("/home");
        };


    }

})();
