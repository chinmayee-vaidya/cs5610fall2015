(function() {
    "use strict";
    angular.module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $location, $rootScope, FormService) {

        $rootScope.form_list = [];

        //get all forms for the user
        if ($rootScope.user !== undefined) {
            FormService.findAllFormsForUser($rootScope.user.id).then(function(forms) {
                $rootScope.form_list = forms;
            });
        }

        // add a new form
        $scope.addForm = function() {
            if ($scope.title !== undefined && $rootScope.user !== undefined) {

                //get all user forms
                if ($rootScope.form_list !== undefined) {
                    var exists = 0;
                    // loop through the user forms to see if the form exists
                    for (var i = 0; i < $rootScope.form_list.length; i++) {
                        if ($rootScope.form_list[i].title == $scope.title) {
                            exists = 1;
                            break;
                        }
                    }

                    if (exists != 1) {
                        var new_form = {
                            id: Guid.raw(),
                            title: $scope.title
                        };
                        FormService.createFormForUser($rootScope.user.id, new_form).then(function(forms) {
                            $rootScope.form_list = forms;
                        });
                    }

                }
            }
        };

        // delete an existing form
        $scope.deleteForm = function(form) {
            //delete the form
            FormService.deleteFormById(form.id).then(function(forms) {
                //get all user forms
                $rootScope.form_list = forms;
            });
        };

        //selectForm
        $scope.selectForm = function(index) {
            $rootScope.selected_form_id = $rootScope.form_list[index].id;
            $scope.title = $rootScope.form_list[index].title;
        };

        //updateForm

    }
})();
