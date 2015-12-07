(function() {
    "use strict";
    angular.module("HotelApp")
        .controller("RestaurantController", RestaurantController);

    function RestaurantController($scope, $rootScope, $routeParams, $location, BusinessService, ReviewService, UserService) {

        var model = this;
        var resId = $routeParams["bid"];
        model.userDefined = userDefined;
        model.addReview = addReview;
        model.upvote = upvote;
        model.downvote = downvote;

        function upvote(review) {

            if ($rootScope.user === undefined) {
                alert("You need to login to vote");
                $location.path("/login");
            } else {

                //model.upCount=review.upvotes;
                var id = review._id;

                var key = false;
                var revs_user = $rootScope.user.votedByMe;
                console.log("Revs");
                console.log(revs_user);
                for (var i = 0; i < revs_user.length; i++) {

                    if (revs_user[i].hotel_id === review._id) {
                        key = true;
                        break;
                    }

                }

                if (key === true) {
                    alert("You cannot revote");
                } else {

                    review.upvotes = review.upvotes + 1;

                    var updated_user = $rootScope.user;
                    console.log("Updated user");
                    console.log(updated_user);
                    var new_res = {
                        hotel_id: review._id
                    }

                    updated_user.votedByMe.push(new_res);
                    console.log(updated_user);
                    console.log("Rootscope user111111111111111111");
                    console.log($rootScope.user);
                    console.log($rootScope.user._id);
                    UserService.updateUser($rootScope.user._id, updated_user).then(function(updated) {
                        //now set the models to new names
                        //console.log(updated.length);
                        console.log("11222");
                        console.log(updated);
                        console.log("Updated");
                        console.log(updated);

                        model.user = updated;
                        $rootScope.user = updated;



                    });


                    ReviewService
                        .editReview(id, review)
                        .then(function(review) {

                            model.reviews = review;
                            console.log(review);



                        });

                    UserService.getUserById(review.user_id)
                        .then(function(user) {
                            console.log(user);
                            var current = user;
                            current.points_collected = current.points_collected + 10;
                            UserService.updateUser(current._id, current).then(function(updated) {


                                model.user = updated;
                                console.log("Updated");
                                console.log(user);



                            });





                        });






                }










            }

        }

        function downvote(review) {


                        if ($rootScope.user === undefined) {
                            alert("You need to login to vote");
                            $location.path("/login");
                        } else {

                            //model.upCount=review.upvotes;
                            var id = review._id;

                            var key = false;
                            var revs_user = $rootScope.user.votedByMe;
                            console.log("Revs");
                            console.log(revs_user);
                            for (var i = 0; i < revs_user.length; i++) {

                                if (revs_user[i].hotel_id === review._id) {
                                    key = true;
                                    break;
                                }

                            }

                            if (key === true) {
                                alert("You cannot revote");
                            } else {

                                review.downvotes = review.downvotes + 1;

                                var updated_user = $rootScope.user;
                                console.log("Updated user");
                                console.log(updated_user);
                                var new_res = {
                                    hotel_id: review._id
                                }

                                updated_user.votedByMe.push(new_res);
                                console.log(updated_user);
                                console.log("Rootscope user111111111111111111");
                                console.log($rootScope.user);
                                console.log($rootScope.user._id);
                                UserService.updateUser($rootScope.user._id, updated_user).then(function(updated) {
                                    //now set the models to new names
                                    //console.log(updated.length);
                                    console.log("11222");
                                    console.log(updated);
                                    console.log("Updated");
                                    console.log(updated);

                                    model.user = updated;
                                    $rootScope.user = updated;



                                });


                                ReviewService
                                    .editReview(id, review)
                                    .then(function(review) {

                                        model.reviews = review;
                                        console.log(review);



                                    });

                                UserService.getUserById(review.user_id)
                                    .then(function(user) {
                                        console.log(user);
                                        var current = user;
                                        current.points_collected = current.points_collected -5;
                                        UserService.updateUser(current._id, current).then(function(updated) {


                                            model.user = updated;
                                            console.log("Updated");
                                            console.log(user);



                                        });





                                    });
}}}

        function addReview(review) {

            if ($rootScope.user === undefined) {
                alert("You need to login to write a review!!");
                $location.path("/login");
            }
            review.hotel_id = resId;
            review.upvotes = 0;
            review.downvotes = 0;
            var key = false;
            var revs_user = $rootScope.user.reviewed;
            for (var i = 0; i < revs_user.length; i++) {

                if (revs_user[i].hotel_id === resId) {
                    key = true;
                    break;
                }

            }

            if (key === false) {

                console.log($rootScope.user);
                review.user_id = $rootScope.user._id;
                review.firstName = $rootScope.user.firstName;
                review.lastName = $rootScope.user.lastName;
                review.hotel_name = model.current.name;
                console.log(review);

                ReviewService
                    .addReview(review)
                    .then(function(review) {

                        model.reviews = review;
                        console.log(review);



                    });

                console.log("Printing rootscope outside");
                console.log($rootScope.user);


                var updated_user = $rootScope.user;
                console.log("Updated user");
                console.log(updated_user);
                var new_res = {
                    hotel_id: resId
                }

                updated_user.reviewed.push(new_res);
                console.log(updated_user);
                console.log("Rootscope user111111111111111111");
                console.log($rootScope.user);
                console.log($rootScope.user._id);
                UserService.updateUser($rootScope.user._id, updated_user).then(function(updated) {
                    //now set the models to new names
                    //console.log(updated.length);
                    console.log("11222");
                    console.log(updated);
                    console.log("Updated");
                    console.log(updated);

                    model.user = updated;
                    $rootScope.user = updated;


                });


                ReviewService
                    .getReviewByHotelId(resId)
                    .then(function(review) {
                        console.log("Reviews updated");

                        model.curr_review = review;

                    });





            } else {
                alert("You have already reviewed for this hotel!!!");
            }






        }

        function userDefined() {
            if ($rootScope.user === undefined)
                return false;
            else {
                return true;
            }
        }

        function init() {

            console.log("Entered restaurant search........");
            console.log($rootScope.user);
            console.log(resId);


            ReviewService
                .getReviewByHotelId(resId)
                .then(function(review) {

                    model.curr_review = review;

                });


            BusinessService.searchByBusinessId(resId)
                .then(function(resp) {

                    model.current = resp;
                    var addr = model.current.location.display_address;
                    model.phno = "Ph No: " + model.current.display_phone;
                    model.addr = addr[0] + "  " + addr[1] + "   " + addr[2] + "   " + model.phno;

                    model.rating = Math.floor(model.current.rating);
                    model.pic = model.current.image_url;
                    model.desc = model.current.snippet_text;
                    model.rate = model.current.rating_img_url;
                    var place = model.current.location.coordinate;
                    model.lat = place.latitude;
                    model.longi = place.longitude;

                });

        }

        init();
    }
})();
