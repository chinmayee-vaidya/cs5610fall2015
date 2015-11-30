module.exports=function(mongoose){

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String

    }, {
        collection: "cs5610.project.user",

    });

    return UserSchema;

};
