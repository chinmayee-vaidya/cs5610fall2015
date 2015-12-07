module.exports = function(app, model) {

    app.get("/api/assignment/form/:formId/field", getAllFieldsForForm);
    app.post("/api/assignment/form/:formId/field", addFieldForForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId",deleteField);

    function deleteField(req,res){
        var formId=req.params["formId"];
        var fieldId=req.params["fieldId"];
        model
        .deleteField(formId,fieldId)
        .then(function(form){
            res.json(form);
        });
    }

    function addFieldForForm(req,res){
        var formId=req.params["formId"];
        var field=req.body;
        
        model
        .addFieldForForm(formId,field)
        .then(function(form){
            res.json(form);
        });
    }

    function getAllFieldsForForm(req, res) {

        var formId = req.params["formId"];
        model
            .formById(formId)
            .then(function(form) {
                res.json(form);

            });

    }

};
