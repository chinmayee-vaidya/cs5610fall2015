(function() {
    "use strict";
    angular.module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $location, $rootScope, FormService) {

        $rootScope.form_list = [];

        //get all forms for the user
        if ($rootScope.user !== undefined) {
            FormService.findAllFormsForUser($rootScope.user.user_id, function(forms) {
                $rootScope.form_list = forms;
            });
        }

        // add a new form
        $scope.addForm = function() {
            if ($scope.formname !== undefined && $rootScope.user !== undefined) {

                //get all user forms
                var user_forms = [];
                FormService.findAllFormsForUser($rootScope.user.user_id, function(forms) {
                    user_forms = forms;
                });

                // loop through the user forms to see if the form exists
                var exists = 0;
                for (var i = 0; i < user_forms.length; i++) {
                    if(user_forms[i].form_name == $scope.formname){
                        exists = 1;
                        break;
                    }
                }

                if(exists != 1){
                    var new_form = {
                        form_name:$scope.formname
                    };
                    FormService.createFormForUser($rootScope.user.user_id, new_form, function(created_form){
                        $rootScope.form_list.push(created_form);
                    });
                }
            }
        };

        // delete an existing form
        $scope.deleteForm = function(index) {
            //delete the form
            var form_to_delete = $rootScope.form_list[index];
            FormService.deleteFormById(form_to_delete.form_id, function(forms) {
                //get all user forms
                if(forms.length !== 0){
                    var user_forms = [];
                    FormService.findAllFormsForUser($rootScope.user.user_id, function(forms) {
                        user_forms = forms;
                    });
                    $rootScope.form_list = user_forms;
                    /*var list = [];
                    for(var i=0; i<forms.length; i++){
                        list.push(forms[i]);
                    }
                    $rootScope.form_list = list;*/
                }else{
                    $rootScope.form_list = [];
                }
            });
        };

        // update form
    }
})();
