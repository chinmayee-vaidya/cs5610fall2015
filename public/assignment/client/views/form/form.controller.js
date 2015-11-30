(function() {
    "use strict";
    angular.module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $location, $rootScope,$routeParams, FormService,UserService) {

        var model=this;
        model.addForm=addForm;
        model.updateForm=updateForm;

        model.deleteForm=deleteForm;
        model.selectForm=selectForm;
        var uid=$routeParams["userId"];
        //console.log("ID");
        //console.log(uid);

        function init()
        {
            if($rootScope.user===undefined)
            {
                $location.path("/form");
            }
            if(uid!==undefined)
            {
                model.forms=FormService.findFormsForUser(uid);

                FormService.findFormsForUser(uid)
                .then(function(form){
                 // console.log("Inside all");
                 // console.log(form);
                  model.forms=form;

            });
            }


        }

        init();

        function updateForm(form){
            $rootScope.form_to_be_updated=form;
        }




        // add a new form
        function addForm(form) {

            if(form!==undefined)
            {
                form.userId=uid;
                //console.log("In add : ");
                //console.log(form);
                FormService
                .addForm(form)
                .then(function(forms){
                    model.forms=forms;
                });

            }


        }

        function deleteForm(form)
        {
            FormService
            .deleteForm(form)
            .then(function(forms)
            {
                model.forms=forms;
            });
        }

        function selectForm(index)
        {
            if($rootScope.form_to_be_updated!=undefined){
                var name=model.form.title;
                var f=$rootScope.form_to_be_updated;

                console.log(f._id);
                console.log(f);
                f.title=name;
                FormService.updateform(f._id,f).then(function(updated){
                    //now set the models to new names
                    //console.log(updated.length);

                    $rootScope.form_to_be_updated=undefined;


                });

            }

        }


        // delete an existing form
        /*$scope.deleteForm = function(form) {
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
*/
        //updateForm

    }
})();
