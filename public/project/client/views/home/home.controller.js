(function() {
    "use strict";
    angular.module("HotelApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, $rootScope, $routeParams, $location, SearchService) {

        var model = this;
        model.search = search;

        function init() {

            if($rootScope.user===undefined)
            {
                $location.path("/home");
            }

            SearchService.searchByNumberAndTerm(1, "prawns")
                .then(function(resp) {
                    model.hotel1 = resp.businesses[0];
                    var c = model.hotel1;
                    var ad1 = c.location.display_address;
                    model.hotel1.addr = ad1[0] + ", " + ad1[1] + ", " + ad1[2] + "  Ph No: " + c.display_phone;
                    model.hotel1.desc = c.snippet_text;

                });

            SearchService.searchByNumberAndTerm(1, "fish")
                .then(function(resp) {
                    model.hotel2 = resp.businesses[0];
                    var c = model.hotel2;
                    var ad1 = c.location.display_address;
                    model.hotel2.addr = ad1[0] + ", " + ad1[1] + ", " + ad1[2] + "  Ph No: " + c.display_phone;
                    model.hotel2.desc = c.snippet_text;

                });


            SearchService.searchByNumberAndTerm(1, "garlic bread")
                .then(function(resp) {
                    model.hotel3 = resp.businesses[0];
                    var c = model.hotel3;
                    var ad1 = c.location.display_address[0];
                    model.hotel3.addr = ad1[0] + ", " + ad1[1] + ", " + ad1[2] + "  Ph No: " + c.display_phone;
                    model.hotel3.desc = c.snippet_text;

                });


            SearchService.searchByNumberAndTerm(1, "wraps")
                .then(function(resp) {
                    model.hotel4 = resp.businesses[0];
                    var c = model.hotel4;
                    var ad1 = c.location.display_address[0];
                    model.hotel4.addr = ad1[0] + ", " + ad1[1] + ", " + ad1[2] + "  Ph No: " + c.display_phone;
                    model.hotel4.desc = c.snippet_text;
                });

        }

        init();

        function search(data) {

            if (data === undefined) {
                alert("Enter valid value to search");
            } else {
                var current = data.type;
                var place = data.city;

                if (current !== undefined && place === undefined) {
                    $location.path("/search/type/" + current);
                } else if (current === undefined && place !== undefined) {
                    $location.path("/search/place/" + place);
                } else {
                    $location.path("/search/type/" + current + "/place/" + place);
                }
            }




        }
    }

})();
