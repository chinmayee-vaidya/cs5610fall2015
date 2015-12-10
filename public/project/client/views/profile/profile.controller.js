(function() {
    "use strict";
    angular.module("HotelApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, $routeParams, $location, UserService, ReviewService,$cookieStore) {

        var model = this;
        model.updateData = updateData;
        model.delete = deleteData;
        model.updateReview = updateReview;
        model.deleteReview = deleteReview;

        var userId = $routeParams["userId"];

        function getUserRating() {

        }

        function updateReview(rev) {

            ReviewService
                .editReview(rev._id, rev)
                .then(function(review) {

                    ReviewService.getReviewByUserId(userId)
                        .then(function(review) {
                            model.reviews = review;
                            //console.log(review);

                        });

                });





        }

        function deleteReview(rev) {

            ReviewService
                .deleteReview(rev._id, rev)
                .then(function(review) {

                    //console.log("After deletion:");
                    //console.log(review);
                    ReviewService.getReviewByUserId(userId)
                        .then(function(review) {
                            model.reviews = review;
                            //console.log(review);

                        });

                    UserService.findAllUsers()
                        .then(function(users) {


                                var h = rev.hotel_id;
                                var r = rev._id;

                                var key = true;
                                for (var i = 0; i < users.length; i++) {



                                    var current = users[i];

                                    //console.log("Current user under consideration...");

                                    //console.log(current);
                                    var rv_list = current.reviewed;
                                    var vo_list = current.votedByMe;
                                    //console.log("Rootscope");
                                    //console.log($rootScope.user);

                                    for (var j = 0; j < rv_list.length; j++) {
                                        var curr = rv_list[j];
                                        if (curr.hotel_id === h) {
                                            rv_list.splice(j, 1);
                                            current.reviewed = rv_list;
                                            //console.log("Being changed");
                                            //console.log(current);

                                            if (current._id === $rootScope.user._id) {
                                                //console.log("Changing the value of rootscope...");
                                                $rootScope.user = current;
                                                $cookieStore.put("loggedin", current);
                                                //console.log($rootScope.user);
                                                //console.log("Review delete");
                                                //console.log(current);

                                            }
                                            UserService.updateUser(current._id, current).then(function(updated) {
                                                //now set the models to new names
                                                ////console.log(updated.length);

                                            })
                                            key = false;
                                            break;
                                        }

                                    }



                                    for (var k = 0; k < vo_list.length; k++) {
                                        var curr1 = vo_list[k];
                                        if (curr1.hotel_id === r) {
                                            vo_list.splice(k, 1);
                                            current.votedByMe = vo_list;
                                            if (current._id === $rootScope.user._id) {
                                                $rootScope.user = current;
                                                $cookieStore.put("loggedin", current);
                                            }
                                            UserService.updateUser(current._id, current).then(function(updated) {
                                                //now set the models to new names
                                                ////console.log(updated.length);

                                            })
                                            key = false;
                                            break;
                                        }

                                    }


                                }

                            }

                        );

                });





        }



        function deleteData(rev) {

            ReviewService.deleteReview(rev)
                .then(function(rev) {


                });

            ReviewService.getReviewByUserId(userId)
                .then(function(review) {
                    model.reviews = review;

                });


        }

        function init() {
            ////console.log("In controller "+userId);
            if ($rootScope.user === undefined) {
                $location.path("/login");
            } else if (userId !== undefined) {
                UserService.getUserById(userId)
                    .then(function(user) {
                        //console.log(user);
                        model.user = user;
                        model.current_name = user.firstName + "      " + user.lastName;
                        var join = user.created;
                        var d = new Date(join);
                        //console.log(join);
                        model.dte = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
                        //console.log(model.dte);

                        //initialize level progress
                        model.user.foodie_level = Math.floor((model.user.points_collected / 100) + 1);
                        //set progress values
                        $(document).ready(function() {
                            if (model.user.foodie_level > 1) {
                                //set level 1 full and dormant
                                $('#level1progress').css("width", "20%");
                                if (model.user.foodie_level > 2) {
                                    //set level 2 full and dormant
                                    $('#level2progress').css("width", "20%");
                                    if (model.user.foodie_level > 3) {
                                        //set level 3 full and dormant
                                        $('#level3progress').css("width", "20%");
                                        if (model.user.foodie_level > 4) {
                                            //set level 4 full and dormant
                                            $('#level4progress').css("width", "20%");
                                            if (model.user.foodie_level > 5) {
                                                //set level 4 full and dormant
                                                $('#level5progress').css("width", "20%");
                                            } else {
                                                $('#level5progress').css("width", "" + (model.user.points_collected % 100) / 5 + "%");
                                                $('#level5progress').addClass("progress-bar-striped active");
                                            }
                                        } else {
                                            $('#level4progress').css("width", "" + (model.user.points_collected % 100)  / 5 + "%");
                                            $('#level4progress').addClass("progress-bar-striped active");
                                        }
                                    } else {
                                        $('#level3progress').css("width", "" + (model.user.points_collected % 100)  / 5 + "%");
                                        $('#level3progress').addClass("progress-bar-striped active");
                                    }
                                } else {
                                    $('#level2progress').css("width", "" + (model.user.points_collected % 100)  / 5 + "%");
                                    $('#level2progress').addClass("progress-bar-striped active");
                                }
                            } else {
                                $('#level1progress').css("width", "" + (model.user.points_collected % 100)  / 5 + "%");
                                $('#level1progress').addClass("progress-bar-striped active");
                            }
                        });

                    });

                ReviewService.getReviewByUserId(userId)
                    .then(function(review) {
                        model.reviews = review;
                        //console.log(review);

                    });

            } else {
                model.user = undefined;
            }
        }
        init();


        function updateData(user) {

            //console.log("Went into update");

            //Validate user
            var updated_user = {
                username: model.user.username,
                password: model.user.password,
                firstName: model.user.firstName,
                lastName: model.user.lastName,
                email: model.user.email,
                created: model.user.created,
                votedByMe: model.user.votedByMe,
                reviewed: model.user.reviewed,
                points_collected: user.points_collected,
                bio: model.user.bio


            };
            //console.log(user);

            UserService.updateUser(userId, updated_user).then(function(updated) {
                //now set the models to new names
                ////console.log(updated.length);

                model.user = updated;


            });

            $rootScope.user = model.user;
            $cookieStore.put("loggedin", model.user);
        }

    }
})();
