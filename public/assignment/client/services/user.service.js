(function() {
    angular.module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $q) {

        var api={
            findUserByUsernameAndPassword:findUserByUsernameAndPassword,
            findAllUsers:findAllUsers,
            getUserById:getUserById,
            addUser:addUser,
            deleteUserById:deleteUserById,
            updateUser:updateUser



        };
        return api;

        function getUserById(id){
            var deferred=$q.defer();
            $http.get("/api/assignment/user/"+id).success(function(response){
                deferred.resolve(response);
            });

            return deferred.promise;

        }

        function findUserByUsernameAndPassword(username,password) {

            var deferred = $q.defer();
            $http.get("/api/assignment/user?username=" + username + "&password=" + password).success(function(response){
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function findAllUsers  (){
            console.log("Reached");
            var deferred = $q.defer();
            $http.get("/api/assignment/user").success(function(response){
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function addUser (user) {

            var new_user = user;
            //new_user.id = Guid.raw();

            var deferred = $q.defer();
            $http.post("/api/assignment/user", user).success(function(response){
                console.log("In users.ser"+response[0]);
                deferred.resolve(response);


            });
            return deferred.promise;
        }

        function deleteUserById (id){

            var deferred = $q.defer();
            $http.delete("/api/assignment/user/" + id).success(function(response){
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function updateUser(id,user)  {

            var deferred = $q.defer();
            $http.put("/api/assignment/user/" + id, user).success(function(response){
                deferred.resolve(response);
            });
            return deferred.promise;

        }


    }

})();



/*

calling deferred funcs
findUserByUsernameAndPassword(u,p).then(function(response){
    //do stuff with response
});
*/
