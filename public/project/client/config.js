(function() {
    "use strict";
    angular
        .module("Project")
        .config(Configure);


    function Configure($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "home/home.view.html"
            })
            .when("/register", {
                templateUrl: "register/register.view.html"
            })
            .when("/login", {
                templateUrl: "login/login.view.html"
            })
            .when("/profile", {
                templateUrl: "profile/profile.view.html"
            })
            .when("/editprofile", {
                templateUrl: "profile/profile.view.html"
            })
            .when("/pay", {
                templateUrl: "pay/pay.view.html"
            })
            .when("/contact", {
                templateUrl: "ContactUs.html"
            })
            .when("/editprofile", {
                templateUrl: "profile/profile.view.html"
            })
            .when("/reguserprof", {
                templateUrl: "profile/reguserprofile.view.html"
            })
            .when("/review", {
                templateUrl: "review/review.view.html"
            })
            .when("/restaurant", {
                templateUrl: "restaurant/restaurant.view.html"
            })
            .when("/search", {
                templateUrl: "search/search.view.html"
            })
            .when("/home_login", {
                templateUrl: "home/home_login.view.html"
            })
            .otherwise({
                redirectTo: "home"
            });
    }
})();
