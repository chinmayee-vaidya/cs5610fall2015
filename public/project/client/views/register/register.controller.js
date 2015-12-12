(function() {
    "use strict";
    angular.module("HotelApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $location, $rootScope, UserService, $cookieStore) {

        var model = this;
        model.register = addUser;
        model.match = match;

        function match(pass, conf) {
            if (pass !== undefined && conf !== undefined) {
                if (pass.length != conf.length) {
                    model.passnomatch = true;
                } else {
                    for (var i = 0; i < pass.length; i++) {
                        if (pass[i] != conf[i]) {
                            model.passnomatch = true;
                        }
                    }
                }

                model.passnomatch = false;
            }
        }

        function init() {
            model.users = UserService.findAllUsers();
            ////console.log(model.users);

        }
        init();

        function addUser(user) {
            // ////console.log("User id:"+user.username);
            if (user !== undefined) {
                if (user.username !== undefined && user.password !== undefined && user.verify_password !== undefined && user.password == user.verify_password && user.email !== undefined) {
                    user.points_collected = 0;
                    user.votedByMe=[];
                    user.reviewed=[];

                    UserService
                        .addUser(user)
                        .then(function(users) {


                            //console.log(users);
                            var c =users;
                            $rootScope.user = c;
                            var data_id = c._id;
                            $cookieStore.put("loggedin", c);
                            $location.path("/profile/" + data_id);

                        });
                } else {
                    alert("Enter proper user credentials");
                }
            } else {
                alert("User is undefined");
            }





        }
    }
})();
