(function() {
    "use strict";
    angular.module("HotelApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $rootScope, $location) {
        $scope.$location = $location;

        $scope.logout = function(){
            $rootScope.user = undefined;
            $rootScope.form_list = [];
            $location.path("/home");
        };
    }

})();
