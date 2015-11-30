(function() {
    "use strict";
    angular.module("HotelApp")
        .controller("RestaurantController", RestaurantController);

    function RestaurantController($scope,$rootScope, $routeParams,$location,BusinessService) {

        var model=this;
        var resId=$routeParams["bid"];

        function init()
        {



            BusinessService.searchByBusinessId(resId)
                .then(function(resp) {

                    model.current = resp;
                    var addr=model.current.location.display_address;
                    model.addr=addr[0]+"  "+addr[1]+"   "+addr[2];
                    model.phno="Ph No: "+model.current.display_phone;
                    model.rating=model.current.rating;
                    model.pic=model.current.image_url;
                    model.desc=model.current.snippet_text;
                    model.rate=model.current.rating_img_url;

                });



        }

        init();
    }
})();
