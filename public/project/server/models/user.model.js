var q = require("q");
module.exports = function(mongoose, db) {
    var UserSchema=require("./user.schema.js")(mongoose);

    var UserModel1 = mongoose.model("UserModel1", UserSchema);

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

    function create(user) {
        var deferred = q.defer();
        var uname = user._id;
        //console.log("To be created" + uname);
        //console.log("To be created" + user);
        UserModel1.create(user, function(err, user) {
            UserModel1.find(function(err, users) {
                //console.log("In user: " + users);
                //console.log(user._id);
                deferred.resolve(users);
            });
        });

        return deferred.promise;
    }



    function findAll() {
        var deferred = q.defer();
        UserModel1.find(function(err, users) {
            deferred.resolve(users);

        });
        return deferred.promise;

    }

    function findById(userId) {


        var deferred = q.defer();
        //console.log("in model: " + userId);
        UserModel1.findById({
            _id: userId
        }, function(err, user) {
            //console.log(user);
            deferred.resolve(user);

        });

        return deferred.promise;


    }

    function updateUser(id, user) {
        console.log("Entered update user");
        console.log(user);
        //var _id = mongoose.Types.ObjectId.fromString(id1);
        var deferred = q.defer();
        var uname=user.username;
        var pass=user.password;
        var fname=user.firstName;
        var lname=user.lastName;
        var e=user.email;
        var b=user.bio;
        var c=user.created;
        var revs=user.reviewed;
        var votes=user.votedByMe;
        var curr_pts=user.points_collected;

        UserModel1.findById(id, function(err, user){
            console.log("printing........");
            console.log(user);
            user.username=uname;
            user.password=pass;
            user.firstName=fname;
            user.lastName=lname;
            user.email=e;
            user.created=c;
            user.bio=b;
            user.reviewed=revs;
            user.votedByMe=votes;
            user.points_collected=curr_pts;
            console.log("Find users");
            console.log(user);

            user.save(function(err, user){
                if(err)
                console.log(err);
                console.log("11111111111111111122222222222");
                console.log(user);
                //console.log("Server side: "+user);
                deferred.resolve(user);
            });
        });

        return deferred.promise;
    }

    function deleteUser(id) {
        var deferred = q.defer();

        UserModel1.findByIdAndRemove(id, function(err, user) {
            UserModel1.find(function(err, users) {
                //console.log("In user: " + users);
                //console.log(user._id);
                deferred.resolve(users);
            });

        });

            return deferred.promise;
        }

    function findUserByUsername(name) {

        var deferred = q.defer();
        UserModel1.find({
            username: name
        }, function(err, user) {
            deferred.resolve(user);

        });


        return deferred.promise;


    }

    function findUserByCredentials(user) {



        var deferred = q.defer();
        UserModel1.find({
            username: user.username,
            password: user.password
        }, function(err, user) {

            deferred.resolve(user);

        });

        return deferred.promise;

    }

};
