(function() {
    "use strict";
    angular.module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope,$rootScope, $routeParams,$location,UserService,ReviewService) {

        var model=this;

        var userId=$routeParams["userId"];
        model.update=update;

        function init()
        {
            //console.log("In controller "+userId);
            if($rootScope.user===undefined)
            {
                $location.path("/profile");
            }
            else if(userId!==undefined)
            {
                UserService.getUserById(userId)
                .then(function(user){
                  model.user=user;



            });

        }

        else {
            model.user=undefined;
        }
    }
        init();


        function update(user) {

            //Validate user
            var updated_user = {
                username: model.user.username,
                password: model.user.password,
                firstName: model.user.firstName,
                lastName: model.user.lastName,
                email: model.user.email
            };

            UserService.updateUser(userId, updated_user).then(function(updated){
                //now set the models to new names
                //console.log(updated.length);

                model.user=updated;


            });

            $rootScope.user=model.user;
        }

    }
})();
