module.exports=function(mongoose){

    var ReviewSchema = mongoose.Schema({
        hotel_id:String,
        user_id:String,
        firstName:String,
        lastName:String,
        review_text:String,
        hotel_name:String,
        rating:{ type: Number, min: 0, max: 5},
        upvotes:Number,
        downvotes:Number,


    }, {
        collection: "cs5610.project.review",

    });

    return ReviewSchema;

};
