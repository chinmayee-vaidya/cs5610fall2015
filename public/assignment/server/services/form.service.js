module.exports = function(app, model, db) {

    var form_model = require("../models/form.model.js")(app);

    app.get('/api/assignment/form', function(req, res) {
        if (req.query.title !== undefined) {
            res.json(form_model.findFormByTitle(req.query.title));
        } else {
            res.json(form_model.findAll());
        }
    });

    app.get('/api/assignment/user/:userId/form', function(req, res) {
        var userID = req.params.userId;
        res.json(form_model.findFormsForUser(userID));
    });

    app.get('/api/assignment/form/:formId', function(req, res) {
        var formId = req.params.formId;
        res.json(form_model.findById(formId));

    });

    app.delete('/api/assignment/form/:formId', function(req, res) {
        var index = req.params.formId;
        res.json(form_model.remove(index));
    });

    app.post('/api/assignment/user/:userId/form', function(req, res) {

        var form = req.body;
        form.userId = req.params.userId;
        res.json(form_model.create(form));

    });

    app.put('/api/assignment/form/:formId', function(req, res) {

        var form = req.body;
        var index = req.params.formId;
        res.json(form_model.updateForm(index, form));

    });

};
