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
                templateUrl: "views/home/home.view.html",
                controller: "HomeController",
                controllerAs: "model"
            })
            .when("/admin/:userId", {
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController",
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

            .when("/username", {
                templateUrl: "views/profile/profile.view.html"
            })
            .when("/logout", {
                templateUrl: "logout.html"
            })
            .when("/admin/:bid", {
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController",
                controllerAs: "model"
            })
            .when("/user/:userId/form/:formId/fields", {
                templateUrl: "views/field/field.view.html",
                controller: "FieldController",
                controllerAs: "model"
            })

        .when("/restaurant", {
            templateUrl: "views/restaurant/restaurant.view.html"

        })

        .when("/restaurant/business/:bid", {
            templateUrl: "views/restaurant/restaurant.view.html",
            controller: "RestaurantController",
            controllerAs: "model"
        })


        .when("/search/type/:data", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController",
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

            .when("/search/type/:data/next/previous", {
                    templateUrl: "views/search/search.previous.view.html",
                    controller: "SearchController",
                    controllerAs: "model"

                })
                .when("/search/place/:place/next/previous", {
                    templateUrl: "views/search/search.previous.view.html",
                    controller: "SearchController",
                    controllerAs: "model"

                })
                .when("/search/type/:data/place/:place/next/previous", {
                    templateUrl: "views/search/search.previous.view.html",
                    controller: "SearchController",
                    controllerAs: "model"

                })

                .when("/search/type/:data/previous", {
                        templateUrl: "views/search/search.view.onlyprev.html",
                        controller: "SearchController",
                        controllerAs: "model"

                    })
                    .when("/search/place/:place/previous", {
                        templateUrl: "views/search/search.view.onlyprev.html",
                        controller: "SearchController",
                        controllerAs: "model"

                    })
                    .when("/search/type/:data/place/:place/previous", {
                        templateUrl: "views/search/search.view.onlyprev.html",
                        controller: "SearchController",
                        controllerAs: "model"

                    })


        .otherwise({
            redirectTo: "home"
        });
    }
})();
