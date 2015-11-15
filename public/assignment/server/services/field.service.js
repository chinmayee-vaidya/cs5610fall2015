module.exports = function(app, model, db) {

    var form_model = require("../models/form.model.js")(app);

    app.get('/api/assignment/form/:formId/field/:fieldId', function(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        res.json(form_model.findField(formId, fieldId));
    });

    app.get('/api/assignment/form/:formId/field', function(req, res) {
        var formId = req.params.formId;
        res.json(form_model.findAllFields(formId));
    });

    app.delete('/api/assignment/form/:formId/field/:fieldId', function(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        res.json(form_model.removeField(formId, fieldId));
    });

    app.post('/api/assignment/form/:formId/field', function(req, res) {
        var field = req.body;
        var formId = req.params.formId;
        res.json(form_model.createField(formId, field));
    });

    app.put('/api/assignment/form/:formId/field/:fieldId', function(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        res.json(form_model.updateField(formId, fieldId));
    });
};
