(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .config(Configure);


    function Configure($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html"
            })
            .when("/fields", {
                templateUrl: "views/field/field.view.html"
            })
            .when("/profile/:userId", {
                templateUrl: "views/profile/profile.view.html",
                controller:"ProfileController",
                controllerAs:"model"
            })

            .when("/form/:userId", {
                templateUrl: "views/form/form.view.html",
                controller:"FormController",
                controllerAs:"model"
            })
            .when("/home/:userId", {
                templateUrl: "views/home/home.view.html"
            })
            .when("/admin/:userId", {
                templateUrl: "admin.html"

            })

            .when("/profile", {
                templateUrl: "views/profile/profile.view.html",
                controller:"ProfileController",
                controllerAs:"model"
            })

            .when("/register", {
                templateUrl: "views/register/register.view.html",
                controller:"RegisterController",
                controllerAs:"model"
            })
            .when("/login", {
                templateUrl: "views/login/login.view.html",
                controller:"LoginController",
                controllerAs:"model"
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
                controller:"FieldController",
                controllerAs:"model"
            })
            .otherwise({
                redirectTo: "home"
            });
    }
})();
