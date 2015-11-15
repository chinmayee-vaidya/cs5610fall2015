module.exports = function(app) {

    var users = require("./user.mock.json");

    var model = {

        create: create,
        findAll: findAll,
        findById: findById,
        update: update,
        delete: remove,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials

    };
    return model;


    function create(userObj) {
        users.push(userObj);
        return userObj;
    }

    function findAll() {
        return users;
    }

    function findById(userId) {

        for (var i = 0; i < users.length; i++) {
            if (users[i].id == userId) {
                return users[i];
            }
        }
        return null;

    }

    function update(userID, updatedUserObject) {
        for (var i = 0; i < users.length; i++) {
            if (users[i].id == userID) {
                users[i] = updatedUserObject;
                return users[i]
            }
        }
        return null;
    }

    function remove(userID) {
        for (var i = 0; i < users.length; i++) {
            if (users[i].id == userID) {
                users.splice(i, 1);
                return users;
            }
        }
        return users;
    }

    function findUserByUsername(username) {
        for (var i = 0; i < users.length; i++) {
            if (users[i].username == username) {
                return (users[i]);
            }
        }
        return null;
    }

    function findUserByCredentials(credentials) {
        //credential is an object with members username and password
        //dont pass 2 variables here as the specs mention a credential object
        /*like this
        credential = {
            username: A,
            password: a
        };*/

        for (var i = 0; i < users.length; i++) {
            if (users[i].username == credentials.username && users[i].password == credentials.password) {
                return users[i];
            }
        }
        return null;
    }

};
