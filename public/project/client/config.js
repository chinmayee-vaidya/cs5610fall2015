(function() {
    "use strict";
    angular
        .module("HotelApp")
        .config(Configure);


    function Configure($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller: "HomeController",
                controllerAs: "model"
            })
            .when("/fields", {
                templateUrl: "views/field/field.view.html"
            })
            .when("/profile/:userId", {
                templateUrl: "views/profile/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model"
            })

        .when("/form/:userId", {
                templateUrl: "views/form/form.view.html",
                controller: "FormController",
                controllerAs: "model"
            })
            .when("/home/:userId", {
                templateUrl: "views/home/home.view.html"
            })
            .when("/admin/:userId", {
                templateUrl: "admin.html"

            })
            .when("/profile", {
                templateUrl: "views/profile/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model"
            })

        .when("/register", {
                templateUrl: "views/register/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/login/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/form", {
                templateUrl: "views/form/form.view.html"
            })
            .when("/username", {
                templateUrl: "views/profile/profile.view.html"
            })
            .when("/logout", {
                templateUrl: "logout.html"
            })
            .when("/admin", {
                templateUrl: "admin.html"
            })
            .when("/user/:userId/form/:formId/fields", {
                templateUrl: "views/field/field.view.html",
                controller: "FieldController",
                controllerAs: "model"
            })

        .when("/search", {
            templateUrl: "restaurant.html"

        })

        .when("/search/type/:data", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController",
                controllerAs: "model"

            })
            .when("/restaurant/business/:bid", {
                    templateUrl: "views/restaurant/restaurant.view.html",
                    controller: "RestaurantController",
                    controllerAs: "model"

                })
            .when("/search/place/:place", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController",
                controllerAs: "model"

            })
            .when("/search/type/:data/place/:place", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController",
                controllerAs: "model"

            })

        .otherwise({
            redirectTo: "home"
        });
    }
})();
