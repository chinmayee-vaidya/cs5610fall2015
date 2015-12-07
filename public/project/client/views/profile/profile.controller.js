(function() {
    "use strict";
    angular.module("HotelApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope,$rootScope, $routeParams,$location,UserService,ReviewService) {

        var model=this;
        model.updateData=updateData;
        model.delete=deleteData;
        model.updateReview=updateReview;
        model.deleteReview=deleteReview;

        var userId=$routeParams["userId"];

        function updateReview(rev)
        {

            ReviewService
                .editReview(rev._id, rev)
                .then(function(review) {

                });


                ReviewService.getReviewByUserId(userId)
                .then(function(review){
                  model.reviews=review;
                  console.log(review);

            });


        }

        function deleteReview(rev){

            ReviewService
                .deleteReview(rev._id, rev)
                .then(function(review) {

                    console.log("After deletion:");
                    console.log(review);

                });

                ReviewService.getReviewByUserId(userId)
                .then(function(review){
                  model.reviews=review;
                  console.log(review);

            });

        }



        function deleteData(rev){

            ReviewService.deleteReview(rev)
            .then(function(rev){


        });

        ReviewService.getReviewByUserId(userId)
        .then(function(review){
          model.reviews=review;

    });


        }

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
                  console.log(user);
                  model.user=user;
                  model.current_name=user.firstName+"      "+user.lastName;
                  var join=user.created;
                  var d=new Date(join);
                  console.log(join);
                  model.dte=d.getDate()+"-"+(d.getMonth()+1)+"-"+d.getFullYear();
                  console.log(model.dte);

            });

            ReviewService.getReviewByUserId(userId)
            .then(function(review){
              model.reviews=review;
              console.log(review);

        });




        }

        else {
            model.user=undefined;
        }
    }
        init();


        function updateData(user) {

            console.log("Went into update");

            //Validate user
            var updated_user = {
                username: model.user.username,
                password: model.user.password,
                firstName: model.user.firstName,
                lastName: model.user.lastName,
                email: model.user.email,
                created:model.user.created,
                bio:model.user.bio


            };
            console.log(user);

            UserService.updateUser(userId, updated_user).then(function(updated){
                //now set the models to new names
                //console.log(updated.length);

                model.user=updated;


            });

            $rootScope.user=model.user;
        }

    }
})();
