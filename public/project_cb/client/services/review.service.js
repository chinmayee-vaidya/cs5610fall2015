(function() {
    angular.module("HotelApp")
        .factory("ReviewService", ReviewService);

    function ReviewService($http, $q) {

        var api={

            findAllReviews:findAllReviews,
            getReviewByUserId:getReviewByUserId,
            getReviewByHotelId:getReviewByHotelId,
            editReview:editReview,
            deleteReview:deleteReview,
            addReview:addReview,
            deleteByUserId:deleteByUserId



        };
        return api;

        function deleteByUserId(id){

            var deferred = $q.defer();
            $http.delete("/api/project/user/"+id+"review").success(function(response){
                deferred.resolve(response);
            });
            return deferred.promise;

        }

        function findAllReviews  (){
            //////console.log("Reached");
            var deferred = $q.defer();
            $http.get("/api/project/review").success(function(response){
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function getReviewByUserId(id){

            var deferred=$q.defer();
            $http.get("/api/project/user/"+id+"/review").success(function(response){
                deferred.resolve(response);
            });

            return deferred.promise;

        }

        function addReview(review){
            var deferred = $q.defer();
            $http.post("/api/project/review", review).success(function(response){
                ////////console.log("In users.ser"+response[0]);
                deferred.resolve(response);


            });
            return deferred.promise;

        }

        function getReviewByHotelId(id){

            var deferred=$q.defer();
            $http.get("/api/project/hotel/"+id).success(function(response){
                deferred.resolve(response);
            });

            return deferred.promise;

        }
        function editReview(id,review){

            var deferred = $q.defer();

            $http.put("/api/project/review/" + id,review).success(function(response){
                deferred.resolve(response);
            });
            return deferred.promise;

        }



        function deleteReview(review){
            //////console.log("In delete reviewwwwwwwwwwwwww");
            //////console.log(review);

            var deferred=$q.defer();

            ////////console.log(fid);


            $http.delete("/api/project/review/"+ review).success(function(response) {
                deferred.resolve(response);
            });
            return deferred.promise;

        }

        /*function getUserById(id){
            var deferred=$q.defer();
            $http.get("/api/project/user/"+id).success(function(response){
                deferred.resolve(response);
            });

            return deferred.promise;

        }

        function findUserByUsernameAndPassword(username,password) {

            var deferred = $q.defer();
            $http.get("/api/project/user?username=" + username + "&password=" + password).success(function(response){
                deferred.resolve(response);
            });
            return deferred.promise;
        }



        function addUser (user) {

            var new_user = user;
            //new_user.id = Guid.raw();

            var deferred = $q.defer();
            $http.post("/api/project/user", user).success(function(response){
                //////console.log("In users.ser"+response[0]);
                deferred.resolve(response);


            });
            return deferred.promise;
        }

        function deleteUserById (id){

            var deferred = $q.defer();
            $http.delete("/api/project/user/" + id).success(function(response){
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function updateUser(id,user)  {

            var deferred = $q.defer();
            $http.put("/api/project/user/" + id, user).success(function(response){
                deferred.resolve(response);
            });
            return deferred.promise;

        }*/


    }

})();



/*

calling deferred funcs
findUserByUsernameAndPassword(u,p).then(function(response){
    //do stuff with response
});
*/
