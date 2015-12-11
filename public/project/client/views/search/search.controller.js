(function() {
    "use strict";
    angular.module("HotelApp")
        .controller("SearchController", SearchController);

    function SearchController($scope, $rootScope, $routeParams, $location, SearchService) {

        var model = this;
        $scope.$location = $location;
        model.goNext = goNext;
        model.goPrev = goPrev;
        var limit = 40;


        function goNext() {

            $rootScope.ofst = $rootScope.ofst + 10;
            model.start = $rootScope.ofst + 1;
            model.end = $rootScope.ofst + 10;
            if (model.data !== undefined && model.place === undefined) {
                SearchService.searchByTerm(model.data, $rootScope.ofst)
                    .then(function(resp) {
                        if (resp === undefined) {
                            alert("Item you are trying to search could not be found");
                        } else if (resp.businesses.length === 0) {

                            alert("Item you are trying to search could not be found");
                            $location.path("/home");

                        } else {
                            model.searches = resp.businesses;
                        }


                    });
            } else if (model.data === undefined && model.place !== undefined) {
                SearchService.searchByPlace(model.place, $rootScope.ofst)
                    .then(function(resp) {
                        if (resp === undefined) {
                            alert("Item you are trying to search could not be found");
                        } else if (resp.businesses.length === 0) {

                            alert("Item you are trying to search could not be found");
                            $location.path("/home");

                        } else {
                            model.searches = resp.businesses;
                        }

                    });
            } else if (model.data !== undefined && model.place !== undefined) {
                SearchService.searchByTermAndPlace(model.data, model.place, $rootScope.ofst)
                    .then(function(resp) {
                        if (resp === undefined) {
                            alert("Item you are trying to search could not be found");
                        } else if (resp.businesses.length === 0) {

                            alert("Item you are trying to search could not be found");
                            $location.path("/home");

                        } else {
                            model.searches = resp.businesses;
                        }

                    });
            }

            if ($rootScope.ofst === limit) {
                $scope.isLast = true;
                $scope.isFirst = false;
            } else {
                $scope.isLast = false;
                $scope.isFirst = false;
            }

        }

        function goPrev() {

            $rootScope.ofst = $rootScope.ofst - 10;
            model.end = $rootScope.ofst + 10;
            model.start = $rootScope.ofst + 1;
            if (model.data !== undefined && model.place === undefined) {
                SearchService.searchByTerm(model.data, $rootScope.ofst)
                    .then(function(resp) {
                        if (resp === undefined) {
                            alert("Item you are trying to search could not be found");
                        } else if (resp.businesses.length === 0) {

                            alert("Item you are trying to search could not be found");
                            $location.path("/home");

                        } else {
                            model.searches = resp.businesses;
                        }

                    });
            } else if (model.data === undefined && model.place !== undefined) {
                SearchService.searchByPlace(model.place, $rootScope.ofst)
                    .then(function(resp) {
                        if (resp === undefined) {
                            alert("Item you are trying to search could not be found");
                        } else if (resp.businesses.length === 0) {

                            alert("Item you are trying to search could not be found");
                            $location.path("/home");

                        } else {
                            model.searches = resp.businesses;
                        }

                    });
            } else if (model.data !== undefined && model.place !== undefined) {
                SearchService.searchByTermAndPlace(model.data, model.place, $rootScope.ofst)
                    .then(function(resp) {
                        if (resp === undefined) {
                            alert("Item you are trying to search could not be found");
                        } else if (resp.businesses.length === 0) {

                            alert("Item you are trying to search could not be found");
                            $location.path("/home");

                        } else {
                            model.searches = resp.businesses;
                        }

                    });
            }

            if ($rootScope.ofst === 0) {
                $scope.isFirst = true;
                $scope.isLast = false;
            } else {
                $scope.isLast = false;
                $scope.isFirst = false;
            }
        }



        function init() {

            model.data = $routeParams.data;
            model.place = $routeParams.place;
            $rootScope.ofst = 0;
            model.start = 1;
            model.end = 10;
            $scope.isFirst = true;
            $scope.isLast = false;
            if (model.data !== undefined && model.place === undefined) {


                model.display = model.data;
                SearchService.searchByTerm(model.data, $rootScope.ofst)
                    .then(function(resp) {
                        ////console.log("Searched data");
                        ////console.log(resp);
                        if (resp === undefined) {
                            alert("Item you are trying to search could not be found");
                            $location.path("/home");
                        } else if (resp.businesses.length === 0) {

                            alert("Item you are trying to search could not be found");
                            $location.path("/home");

                        } else {
                            model.searches = resp.businesses;
                        }

                    });
            } else if (model.data === undefined && model.place !== undefined) {
                //////console.log(resp);
                model.display = model.place;
                SearchService.searchByPlace(model.place, $rootScope.ofst)
                    .then(function(resp) {
                        if (resp === undefined) {
                            alert("Item you are trying to search could not be found");
                            $location.path("/home");
                        } else if (resp.businesses.length === 0) {

                            alert("Item you are trying to search could not be found");
                            $location.path("/home");

                        } else {
                            model.searches = resp.businesses;
                        }

                    });
            } else if (model.data !== undefined && model.place !== undefined) {
                model.display = model.data + " &  " + model.place;
                SearchService.searchByTermAndPlace(model.data, model.place, $rootScope.ofst)
                    .then(function(resp) {
                        if (resp === undefined) {
                            alert("Item you are trying to search could not be found");
                            $location.path("/home");
                        } else if (resp.businesses.length === 0) {

                            alert("Item you are trying to search could not be found");
                            $location.path("/home");

                        } else {
                            model.searches = resp.businesses;
                        }

                    });
            }
        }
        init();
    }
})();
