(function() {
    "use strict";
    angular.module("HotelApp")
        .controller("AdminController", AdminController);

    function AdminController($scope, $rootScope, $routeParams, $location, UserService, ReviewService) {

        var model = this;
        model.removeUser = removeUser;
        model.removeReview = removeReview;
        model.isAdmin = isAdmin;
        model.isNotAdmin = isNotAdmin;
        model.addUser = addUser;
        model.updateUser = updateUser;
        model.makeChanges = makeChanges;
        model.updateReview = updateReview;
        model.makeChangesRev = makeChangesRev;

        function makeChangesRev(rev) {
            ReviewService
                .editReview(rev._id, rev)
                .then(function(review) {


                    ReviewService.findAllReviews()
                        .then(function(review) {
                            model.reviews = review;

                        });

                });

        }

        function updateReview(rev) {
            $rootScope.update_review = rev;
            model.review = rev;
        }

        function makeChanges(user) {

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

            UserService.updateUser(user._id, updated_user).then(function(updated) {
                //now set the models to new names
                ////console.log(updated.length);

                model.user = updated;


            });


        }

        function updateUser(user) {
            $rootScope.selectedUser = user;
            model.user = user;
        }

        function addUser(user) {

            user.points_collected = 0;
            user.votedByMe = [];
            user.reviewed = [];

            if (user.firstName === undefined || user.lastName === undefined || user.username === undefined || user.password === undefined) {
                alert("Incomplete data to add a new user");
            } else {


                UserService
                    .addUser(user)
                    .then(function(users) {

                        model.users = users;

                    });

            }




        }

        function isAdmin(user) {
            var us = user;
            if (us.username === "adminadmin" && us.password === "adminadmin")
                return true;
            else {
                return false;
            }
        }

        function isNotAdmin(user) {
            var us = user;
            if (us.username === "adminadmin" && us.password === "adminadmin")
                return false;
            else {
                return true;
            }
        }

        function init() {

            model.users = UserService.findAllUsers();

            UserService.findAllUsers()
                .then(function(user) {
                    //console.log(user);
                    model.users = user;

                });

            ReviewService
                .findAllReviews()
                .then(function(review) {

                    //console.log(review);

                    model.reviews = review;

                });



        }

        init();

        function removeUser(user) {

            //console.log("In remove user");


            UserService.deleteUserById(user._id)
                .then(function(user) {
                    //console.log(user);
                    model.users = user;

                });

        }

        function removeReview(review) {
            var h = review.hotel_id;
            var r = review._id;

            ReviewService.deleteReview(review._id)
                .then(function(rev) {


                    ReviewService.findAllReviews()
                        .then(function(review) {
                            model.reviews = review;


                        });


                });


            //console.log("In delete revvvvvvvvvvvvvvvvvsss");
            var users = model.users;
            //console.log(users);
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
                        }
                        UserService.updateUser(current._id, current).then(function(updated) {
                            //now set the models to new names
                            ////console.log(updated.length);

                        })
                        key = false;
                        break;
                    }

                }

                UserService.findAllUsers()
                    .then(function(user) {
                        //console.log(user);
                        model.users = user;

                    });
            }









        }


    }


})();
