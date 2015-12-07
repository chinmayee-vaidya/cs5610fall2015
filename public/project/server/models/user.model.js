var q = require("q");
module.exports = function(mongoose, db) {
        var UserSchema = require("./user.schema.js")(mongoose);

        var UserModel11 = mongoose.model("UserModel11", UserSchema);

        var api = {

            create: create,
            findAll: findAll,
            findById: findById,
            updateUser: updateUser,
            deleteUser: deleteUser,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials

        };
        return api;

        function deleteUser(id) {
            var deferred = q.defer();

            UserModel11.findByIdAndRemove(id, function(err, user) {
                deferred.resolve(user);

            });

                return deferred.promise;
            }

            function create(user) {
                var deferred = q.defer();
                var uname = user._id;

                UserModel11.create(user, function(err, user) {
                    UserModel11.find(function(err, users) {

                        deferred.resolve(users);
                    });
                });

                return deferred.promise;
            }



            function findAll() {
                var deferred = q.defer();
                UserModel11.find(function(err, users) {
                    deferred.resolve(users);

                });
                return deferred.promise;

            }

            function findById(userId) {


                var deferred = q.defer();
                //console.log("in model: " + userId);
                UserModel11.findById({
                    _id: userId
                }, function(err, user) {
                    //console.log(user);
                    deferred.resolve(user);

                });

                return deferred.promise;


            }

            function updateUser(id, user) {
                //var _id = mongoose.Types.ObjectId.fromString(id1);
                var deferred = q.defer();
                var uname = user.username;
                var pass = user.password;
                var fname = user.firstName;
                var lname = user.lastName;
                var e = user.email;

                UserModel11.findById(id, function(err, user) {
                    user.username = uname;
                    user.password = pass;
                    user.firstName = fname;
                    user.lastName = lname;
                    user.email = e;

                    user.save(function(err, user) {
                        //console.log("Server side: "+user);
                        deferred.resolve(user);
                    });
                });

                return deferred.promise;
            }



            function findUserByUsername(name) {

                var deferred = q.defer();
                UserModel11.find({
                    username: name
                }, function(err, user) {
                    deferred.resolve(user);

                });


                return deferred.promise;


            }

            function findUserByCredentials(user) {



                var deferred = q.defer();
                UserModel11.find({
                    username: user.username,
                    password: user.password
                }, function(err, user) {

                    deferred.resolve(user);

                });

                return deferred.promise;

            }

        };
