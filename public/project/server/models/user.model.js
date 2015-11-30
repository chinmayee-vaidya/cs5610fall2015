var q = require("q");
module.exports = function(mongoose, db) {
    var UserSchema=require("./user.schema.js")(mongoose);

    var UserModel = mongoose.model("UserModel", UserSchema);

    var api = {

        create: create,
        findAll: findAll,
        findById: findById,
        updateUser: updateUser,
        delete: remove,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials

    };
    return api;

    function create(user) {
        var deferred = q.defer();
        var uname = user._id;
        //console.log("To be created" + uname);
        //console.log("To be created" + user);
        UserModel.create(user, function(err, user) {
            UserModel.find(function(err, users) {
                //console.log("In user: " + users);
                //console.log(user._id);
                deferred.resolve(users);
            });
        });

        return deferred.promise;
    }



    function findAll() {
        var deferred = q.defer();
        UserModel.find(function(err, users) {
            deferred.resolve(users);

        });
        return deferred.promise;

    }

    function findById(userId) {


        var deferred = q.defer();
        //console.log("in model: " + userId);
        UserModel.findById({
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
        var uname=user.username;
        var pass=user.password;
        var fname=user.firstName;
        var lname=user.lastName;
        var e=user.email;

        UserModel.findById(id, function(err, user){
            user.username=uname;
            user.password=pass;
            user.firstName=fname;
            user.lastName=lname;
            user.email=e;

            user.save(function(err, user){
                //console.log("Server side: "+user);
                deferred.resolve(user);
            });
        });

        return deferred.promise;
    }

    function remove() {

    }

    function findUserByUsername(name) {

        var deferred = q.defer();
        UserModel.find({
            username: name
        }, function(err, user) {
            deferred.resolve(user);

        });


        return deferred.promise;


    }

    function findUserByCredentials(user) {



        var deferred = q.defer();
        UserModel.find({
            username: user.username,
            password: user.password
        }, function(err, user) {

            deferred.resolve(user);

        });

        return deferred.promise;

    }

};
