module.exports = function(app) {

    var forms = require("./form.mock.json");
    var model = {

        create: create,
        findAll: findAll,
        findById: findById,
        update: update,
        remove: remove,
        findFormByTitle: findFormByTitle,
        findFormsForUser: findFormsForUser,
        findAllFields: findAllFields,
        findField: findField,
        removeField: removeField,
        createField: createField,
        updateField: updateField
    };
    return model;

    function create(formObj) {
        forms.push(formObj);
        return findFormsForUser(formObj.userId);
    }

    function findAll() {
        return forms;
    }

    function findById(formId) {
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].id == formId) {
                return forms[i];
            }
        }
        return null;
    }

    function update(formId, updatedFormObject) {
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].id == formId) {
                forms[i] = updatedFormObject;
                break;
            }
        }
        return findFormsForUser(updatedFormObject.userId);
    }

    function remove(formId) {
        var userId = null;
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].id == formId) {
                userId = forms[i].userId;
                forms.splice(i, 1);
                break;
            }
        }
        return findFormsForUser(userId);
    }

    function findFormByTitle(title) {
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].title == title) {
                return forms[i];
            }
        }
        return null;
    }

    //Additional methods that I think are relevant
    //Not changing the above as the specs dont allow.
    function findFormsForUser(userId) {
        var user_forms = [];
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].userId == userId) {
                user_forms.push(forms[i]);
            }
        }
        return user_forms;
    }

    //return all fields in the form
    function findAllFields(formId) {
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].id == formId) {
                return(forms[i].fields);
            }
        }
        return null;
    }

    //return a single field
    function findField(formId, fieldId){
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].id == formId) {
                for (var j = 0; j < forms[i].fields.length; j++){
                    if(forms[i].fields[j].id == fieldId){
                        return(forms[i].fields[j]);
                    }
                }
            }
        }
        return null;
    }

    //delete a field
    function removeField(formId, fieldId){
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].id == formId) {
                for (var j = 0; j < forms[i].fields.length; j++){
                    if(forms[i].fields[j].id == fieldId){
                        forms[i].fields.splice(j, 1);
                        return(forms[i].fields);
                    }
                }
            }
        }
        return null;
    }

    //create a new field
    function createField(formId, field){
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].id == formId) {
                if (forms[i].fields === undefined){
                    forms[i].fields = [field];
                }else{
                    forms[i].fields.push(field);
                }
                return forms[i].fields;
            }
        }
        return null;
    }

    //update a field
    function updateField(formId, fieldId, field){
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].id == formId) {
                for (var j = 0; j < forms[i].fields.length; j++){
                    if(forms[i].fields[j].id == fieldId){
                        forms[i].fields[j] = field;
                        return findFormsForUser(forms[i].userId);
                    }
                }
            }
        }
        return null;
    }

};
