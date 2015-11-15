(function() {
    angular.module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $q) {

        var service = {};

        service.findUserByUsernameAndPassword = function(username, password) {

            var deferred = $q.defer();
            $http.get("/api/assignment/user?username=" + username + "&password=" + password).success(function(response){
                deferred.resolve(response);
            });
            return deferred.promise;
        };

        service.findAllUsers = function() {
            var deferred = $q.defer();
            $http.get("/api/assignment/user").success(function(response){
                deferred.resolve(response);
            });
            return deferred.promise;
        };

        service.createUser = function(user) {

            var new_user = user;
            new_user.id = Guid.raw();

            var deferred = $q.defer();
            $http.post("/api/assignment/user", user).success(function(response){
                deferred.resolve(response);
            });
            return deferred.promise;
        };

        service.deleteUserById = function(id) {

            var deferred = $q.defer();
            $http.delete("/api/assignment/user/" + id).success(function(response){
                deferred.resolve(response);
            });
            return deferred.promise;
        };

        service.updateUser = function(id, user) {

            var deferred = $q.defer();
            $http.put("/api/assignment/user/" + id, user).success(function(response){
                deferred.resolve(response);
            });
            return deferred.promise;

        };

        return service;
    }

})();



/*

calling deferred funcs
findUserByUsernameAndPassword(u,p).then(function(response){
    //do stuff with response
});
*/
