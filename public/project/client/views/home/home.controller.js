(function() {
    "use strict";
    angular.module("HotelApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, $rootScope, $routeParams, $location, SearchService) {

        var geocoder;
        var model = this;
        model.search = search;
        model.searchData = {};

        function setPosition(position) {
            var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            geocoder.geocode({
                'location': latlng
            }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results.length > 1) {
                        //get the best match
                        var best = results[0].address_components;
                        var city_found = 0;
                        for (var i = 0; i < best.length; i++) {
                            //loop through types to check if it is a locality
                            for (var j = 0; j < best[i].types.length; j++) {
                                if (best[i].types[j] == 'locality') {
                                    model.searchData.city = best[i].long_name;
                                    city_found = 1;
                                    break;
                                }
                            }
                            if (city_found == 1) {
                                break;
                            }
                        }
                    } else {
                        //set default location
                        model.searchData.city = 'Boston';
                    }
                } else {
                    //set default location
                    model.searchData.city = 'Boston';
                    //console.log("Geocoder failed: " + status);
                }
            });
        }

        function init() {

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

            $(document).ready(function() {
                //initialize geocoder
                geocoder = new google.maps.Geocoder();

                //Set geolocation
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(setPosition);
                } else {
                    //console.log("not supported");
                    //set default location
                    model.searchData.city = 'Boston';
                }
            });
        }

        init();


        function search(data) {

            if (data === undefined) {
                alert("Enter valid value to search");
            } else {
                var current = data.query;
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
