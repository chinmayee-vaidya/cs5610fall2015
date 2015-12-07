var q = require("q");
module.exports = function(mongoose, db) {
    var ReviewSchema=require("./review.schema.js")(mongoose);

    var ReviewModel = mongoose.model("ReviewModel", ReviewSchema);

    var api = {

        findAllReviews:findAllReviews,
        addReview:addReview,
        getReviewByUser:getReviewByUser,
        getReviewByHotelId:getReviewByHotelId,
        deleteById:deleteById,
        updateReview:updateReview





    };
    return api;

    function updateReview(fid,review){

        var deferred = q.defer();
        var hid=review.hotel_id;
        var uid=review.user_id;
        var rev=review.review_text;
        var uname=review.firstName;
        var lname=review.lastName;
        var rat=review.rating;
        var up=review.upvotes;
        var down=review.downvotes;


        ReviewModel.findById(fid, function(err, review) {
            review.review_text=rev;
            review.rating=rat;
            review.upvotes=up;
            review.downvotes=down;

            review.save(function(err, review) {
                //console.log("Server side: "+user);
                deferred.resolve(review);
            });
        });

        return deferred.promise;

    }

    function deleteById(fid){

        var deferred = q.defer();
        ReviewModel.findByIdAndRemove(fid, function(err, form) {
            deferred.resolve(form);

        });
        return deferred.promise;

    }

    function getReviewByHotelId(id){

        var deferred = q.defer();
        //console.log("in model: " + userId);
        ReviewModel.find({
            hotel_id: id
        }, function(err, review) {
            //console.log(user);
            deferred.resolve(review);

        });

        return deferred.promise;

    }

    function getReviewByUser(id){

        var deferred = q.defer();
        //console.log("in model: " + userId);
        ReviewModel.find({
            user_id: id
        }, function(err, review) {
            //console.log(user);
            deferred.resolve(review);

        });

        return deferred.promise;

    }

    function addReview(review) {
        console.log(review);
        var deferred = q.defer();
        ReviewModel.create(review, function(err, review) {
            console.log("Added");
            console.log(review);
            ReviewModel.find(function(err, review) {
                deferred.resolve(review);
            });
        });

        return deferred.promise;
    }



    function findAllReviews() {
        var deferred = q.defer();
       ReviewModel.find(function(err, review) {
            deferred.resolve(review);

        });
        return deferred.promise;

    }

    /*

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

    }*/

};
