(function() {
    angular.module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService() {
        //glob
        var users = [];

        var service = {};

        service.findUserByUsernameAndPassword = function(username, password, callback) {
            user_index = -1;
            for (var i = 0; i < users.length; i++) {
                if (users[i].username == username && users[i].password == password) {
                    user_index = i;
                    break;
                }
            }

            if (user_index >= 0) {
                callback(users[user_index]);
            } else {
                callback(null);
            }
        };

        service.findAllUsers = function(callback) {
            callback(users);
        };

        service.createUser = function(user, callback) {

            var new_user = user;
            new_user.user_id = Guid.raw();

            //add new user to array
            users.push(new_user);
            callback(new_user);
        };

        service.deleteUserById = function(id, callback) {

            for (var i = 0; i < users.length; i++) {
                if (users[i].user_id == id) {
                    users.splice(i, 1);
                    break;
                }
            }
            callback(users);
        };

        service.updateUser = function(id, user, callback) {

            var user_index = -1;

            for (var i = 0; i < users.length; i++) {
                if (users[i].user_id == id) {
                    user.user_id = users[i].user_id;
                    users[i] = user;
                    user_index = i;
                    break;
                }
            }
            callback(users[user_index]);

        };

        return service;
    }

})();
