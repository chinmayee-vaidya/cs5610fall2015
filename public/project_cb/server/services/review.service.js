module.exports = function(app, model) {


    app.get("/api/project/user/:id/review", getReviewByUser);
    app.get("/api/project/review", getAllReviews);
    app.get("/api/project/hotel/:id",getReviewByHotelId);
    app.post("/api/project/review", addReview);
    app.delete("/api/project/review/:id",deleteReview);
    app.delete("/api/project/user/:id/review",deleteReviewById);
    app.put("/api/project/review/:id",updateReview);


    function deleteReviewById(req,res){
        var fid = req.params["id"];
        //console.log("Serverrrrrrrrrrr side");
        //console.log(fid);

        model
            .deleteByUserId(fid)
            .then(function(form) {
                res.json(form);

            })
    }



    function updateReview(req,res){

        var review = req.body;
        var id = req.params.id;

        ////console.log("sent req: "+user.username);
        model.updateReview(id, review).then(function(updated){
            res.json(updated);
        });

    }

    function deleteReview(req,res){
        var fid = req.params["id"];
        //console.log("Serverrrrrrrrrrr side");
        //console.log(fid);

        model
            .deleteById(fid)
            .then(function(form) {
                res.json(form);

            })
    }

    function getReviewByUser(req,res){

        var fid = req.params["id"];
        model
            .getReviewByUser(fid)
            .then(function(review) {
                res.json(review);

            });


    }

    function getReviewByHotelId(req,res){

        var fid = req.params["id"];
        model
            .getReviewByHotelId(fid)
            .then(function(review) {
                res.json(review);

            });


    }

    function getAllReviews(req,res){

        model
            .findAllReviews()
            .then(function(review) {
                res.json(review);
            })

    }

    function addReview(req,res){

        var review = req.body;

        ////console.log("Server32342");
        ////console.log(form);
        model
            .addReview(review)
            .then(function(review) {
                res.json(review);
            });

    }

    /*function updateForm(req,res){

        var form = req.body;
        var fid = req.params.formId;


        ////console.log("sent req: "+user.username);
        model.updateForm(fid, form).then(function(updated){

            res.json(updated);
        });

    }

    function deleteData(req, res) {

        var fid = req.params["formId"];
        model
            .del(fid)
            .then(function(form) {
                res.json(form);

            })

    }



    function get(req, res) {
        var fid = req.params["formId"];
        model
            .get(fid)
            .then(function(form) {
                res.json(form);

            })
    }

    function getAllForms(req, res) {
        model
            .findAllForms()
            .then(function(form) {
                res.json(form);
            })

    }

    function deleteForm(req, res) {
        var fid = req.params["formId"];
        var uid = req.params["userId"];

        model
            .deleteById(fid, uid)
            .then(function(form) {
                res.json(form);

            })
    }

    function getFormsForUser(req, res) {
        var userId = req.params["userId"];

        model
            .getFormByUser(userId)
            .then(function(form) {
                res.json(form);

            });

    }

    function addForm(req, res) {

        var form = req.body;

        ////console.log("Server32342");
        ////console.log(form);
        model
            .addForm(form)
            .then(function(forms) {
                res.json(forms);
            });

    }*/
};
