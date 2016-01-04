module.exports=function(mongoose){

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        bio:String,
        created: {type: Date, default: Date.now},
        votedByMe:[{
            hotel_id:String
        }],
        reviewed:[
            {
                hotel_id:String

            }
        ],

        points_collected:{ type: Number, min: 0, max: 500}

    }, {
        collection: "cs5610.project.user",

    });

    return UserSchema;

};
