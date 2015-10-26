(function() {
    "use strict";
    angular.module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {

        var forms = [];

        var service = {};

        service.createFormForUser = function(userId, form, callback) {

            var new_form = form;
            new_form.user_id = userId;
            new_form.form_id = Guid.raw();
            forms.push(new_form);
            callback(new_form);
        };

        service.findAllFormsForUser = function(userId, callback) {
            var user_forms = [];

            for (var i = 0; i < forms.length; i++) {
                if (forms[i].user_id == userId) {
                    user_forms.push(forms[i]);
                }
            }

            callback(user_forms);
        };

        service.deleteFormById = function(formId, callback) {

            for (var i = 0; i < forms.length; i++) {
                if (forms[i].form_id == formId) {
                    forms.splice(i, 1);
                    break;
                }
            }
            callback(forms);
        };

        service.updateFormById = function(formId, newForm, callback) {

            for (var i = 0; i < forms.length; i++) {
                if (forms[i].form_id == formId) {
                    //update the form name
                    forms[i].form_name = newForm.form_name;
                    break;
                }
            }
            callback(forms);
        };

        return service;
    }

})();
