(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .config(Configure);


    function Configure($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "home/home.view.html"
            })
            .when("/profile", {
                templateUrl: "profile/profile.view.html"
            })
            .when("/register", {
                templateUrl: "register/register.view.html"
            })
            .when("/login", {
                templateUrl: "login/login.view.html"
            })
            .when("/form", {
                templateUrl: "form/form.view.html"
            })
            .when("/username", {
                templateUrl: "profile/profile.view.html"
            })
            .when("/logout", {
                templateUrl: "logout.html"
            })
            .when("/admin", {
                templateUrl: "admin.html"
            })
            .otherwise({
                redirectTo: "home"
            });
    }
})();
