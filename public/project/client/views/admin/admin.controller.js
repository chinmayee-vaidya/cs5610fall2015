(function() {
    "use strict";
    angular.module("HotelApp")
        .controller("AdminController", AdminController);

        function AdminController($scope,$rootScope, $routeParams,$location,UserService,ReviewService){

            var model=this;
            model.removeUser=removeUser;
            model.removeReview=removeReview;
            model.isAdmin=isAdmin;
            model.isNotAdmin=isNotAdmin;

            function isAdmin(user){
                var us=user;
                if(us.username=== "Chinu" && us.password==="Chinu")
                return true;
                else {
                    return false;
                }
            }

            function isNotAdmin(user){
                var us=user;
                if(us.username=== "Chinu" && us.password==="Chinu")
                return false;
                else {
                    return true;
                }
            }

            function init(){

                 model.users=UserService.findAllUsers();

                 UserService.findAllUsers()
                 .then(function(user){
                     console.log(user);
                   model.users=user;

             });

             ReviewService
                 .findAllReviews ()
                 .then(function(review) {

                     console.log(review);

                     model.reviews = review;

                 });



            }

            init();

            function removeUser(user){

                console.log("In remove user");


                UserService.deleteUserById (user._id)
                .then(function(user){
                    console.log(user);
                  model.users=user;

            });

            }

            function removeReview(review){

                ReviewService.deleteReview(review._id)
                .then(function(rev){


            });



            ReviewService.findAllReviews ()
            .then(function(review){
              model.reviews=review;

        });




            }


        }


    })();
