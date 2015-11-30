(function() {
    "use strict";
    angular.module("HotelApp")
        .controller("SearchController", SearchController);

    function SearchController($scope, $rootScope, $routeParams, $location, SearchService) {

        var model = this;
        function init() {

            var data = $routeParams.data;
            var place = $routeParams.place;

            if (data !== undefined && place === undefined) {
                SearchService.searchByTerm(data)
                    .then(function(resp) {
                        model.searches = resp.businesses;

                    });
            } else if (data === undefined && place !== undefined) {
                SearchService.searchByPlace(place)
                    .then(function(resp) {
                        model.searches = resp.businesses;

                    });
            } else if (data !== undefined && place !== undefined) {
                SearchService.searchByTermAndPlace(data, place)
                    .then(function(resp) {
                        model.searches = resp.businesses;

                    });
            }
        }
        init();
    }
})();
