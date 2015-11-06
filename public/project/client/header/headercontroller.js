(function() {
    "use strict";
    angular.module("Project")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $rootScope, $location) {
        $scope.$location = $location;

    }

})();
