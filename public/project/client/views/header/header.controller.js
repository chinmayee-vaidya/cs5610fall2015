(function() {
    "use strict";
    angular.module("HotelApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $rootScope, $location) {

        $scope.$location = $location;


        function isAdmin(user){
            console.log("Went hereeeeee");
            if($rootScope.user.username==="Chinu"  && $rootScope.user.password==="Chinu")
            return true;
            else {
                return false;
            }

        }

        $scope.isAdmin=function(){
            if($rootScope.user.username==="Chinu" && $rootScope.user.password==="Chinu")
            return true;
            else {
                return false;
            }
        }

        $scope.logout = function(){
            $rootScope.user = undefined;
            $rootScope.form_list = [];
            $location.path("/home");
        };
    }

})();
