module.exports = function(app, model) {

    app.get("/api/assignment/user/:userId/form", getFormsForUser);
    app.get("/api/assignment/form/:formId", get);
    app.get("/api/assignment/form", getAllForms);
    app.post("/api/assignment/user/form", addForm);
    app.delete("/api/assignment/user/:userId/form/:formId", deleteForm);
    app.delete("/api/assignment/form/:formId", deleteData);
    app.put("/api/assignment/form/:formId",updateForm);

    function updateForm(req,res){

        var form = req.body;
        var fid = req.params.formId;


        //console.log("sent req: "+user.username);
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

        //console.log("Server32342");
        //console.log(form);
        model
            .addForm(form)
            .then(function(forms) {
                res.json(forms);
            });

    }
}
