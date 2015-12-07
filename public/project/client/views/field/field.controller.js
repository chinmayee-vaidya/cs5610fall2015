(function() {
    "use strict";
    angular.module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($scope, $location, $rootScope, $routeParams, FieldService) {
        var model = this;
        var uid = $routeParams["userId"];
        var fid = $routeParams["formId"];
        model.addField=addField;
        model.deleteField=deleteField;



        function init() {


            if($rootScope.user===undefined)
            {
                $location.path("/form");
            }





                    FieldService.findFieldsForForm(fid)
                    .then(function(field){
                     // console.log("After init: ");
                     // console.log(field);
                     // console.log("All fields");
                      //console.log(field[0].fields);
                      model.fields=field[0].fields;

                });




        }




        init();

        function deleteField(field)
        {

            FieldService.deleteFieldForm(fid,field)
            .then(function(field){
              model.fields=field.fields;

        });

        }

        function addField(field){
            //console.log("Field: ");
            //console.log(field);
            //console.log("Field Type: ");
            //console.log(field.fieldType);


                if(field.fieldType=== "TEXT")
                {
                    field.label="Single line text field";
                    field.placeholder="New field";

                }
            else if(field.fieldType=== "TEXTAREA")
                {
                    field.label="Multiline text field";
                    field.placeholder="New field";


                }

                else if(field.fieldType=== "DATE")
                {
                    field.label="New date field";
                    field.placeholder="New field";


                }

                else if(field.fieldType=== "RADIO")
                {
                    field.label="New radio buttons";
                    field.options= [{
                        "label": "Option X",
                        "value": "OPTION_X"
                    }, {
                        "label": "Option Y",
                        "value": "OPTION_Y"
                    }, {
                        "label": "Option Z",
                        "value": "OPTION_Z"
                    }]



                }
                else if(field.fieldType=== "CHECKBOX")
                {
                    field.label="New check box";
                    field.options=[{
                        "label": "Option A",
                        "value": "OPTION_A"
                    }, {
                        "label": "Option B",
                        "value": "OPTION_B"
                    }, {
                        "label": "Option C",
                        "value": "OPTION_C"
                    }]



                }

                else if(field.fieldType=== "SELECT")
                {
                    field.label="New select field";
                    field.options=[{
                        "label": "Option D",
                        "value": "OPTION_D"
                    }, {
                        "label": "Option E",
                        "value": "OPTION_E"
                    }, {
                        "label": "Option F",
                        "value": "OPTION_F"
                    }]



                }




            //console.log("After updation");
            //console.log(field);
            FieldService.addFieldForm(fid,field)
            .then(function(field){
                //console.log("Returned");
                //console.log(field);
              model.fields=field.fields;

        });

        }


        /*$scope.addField = function(fieldType) {
            switch (fieldType) {
                case "Single Line Text Field":
                    {
                        var obj_sl = {
                            "id": Guid.raw(),
                            "label": "New Text Field",
                            "type": "TEXT",
                            "placeholder": "New Field"
                        };
                        FieldService.createFieldForForm($rootScope.selected_form_id, obj_sl).then(function(response) {
                            $scope.fields = response;
                        });
                        break;
                    }
                case "Multi Line Text Field":
                    {
                        var obj_ml = {
                            "id": Guid.raw(),
                            "label": "New Text Field",
                            "type": "TEXTAREA",
                            "placeholder": "New Field"
                        };
                        FieldService.createFieldForForm($rootScope.selected_form_id, obj_ml).then(function(response) {
                            $scope.fields = response;
                        });
                        break;
                    }

                case "Date Field":
                    {
                        var obj_dt = {
                            "id": Guid.raw(),
                            "label": "New Date Field",
                            "type": "DATE"
                        };
                        FieldService.createFieldForForm($rootScope.selected_form_id, obj_dt).then(function(response) {
                            $scope.fields = response;
                        });
                        break;
                    }
                case "Dropdown Field":
                    {
                        var obj_dd = {
                            "id": Guid.raw(),
                            "label": "New Dropdown",
                            "type": "OPTIONS",
                            "options": [{
                                "label": "Option 1",
                                "value": "OPTION_1"
                            }, {
                                "label": "Option 2",
                                "value": "OPTION_2"
                            }, {
                                "label": "Option 3",
                                "value": "OPTION_3"
                            }]
                        };
                        FieldService.createFieldForForm($rootScope.selected_form_id, obj_dd).then(function(response) {
                            $scope.fields = response;
                        });
                        break;
                    }

                case "Checkboxes Field":
                    {
                        var obj_cb = {
                            "id": Guid.raw(),
                            "label": "New Checkboxes",
                            "type": "CHECKBOXES",
                            "options": [{
                                "label": "Option A",
                                "value": "OPTION_A"
                            }, {
                                "label": "Option B",
                                "value": "OPTION_B"
                            }, {
                                "label": "Option C",
                                "value": "OPTION_C"
                            }]
                        };
                        FieldService.createFieldForForm($rootScope.selected_form_id, obj_cb).then(function(response) {
                            $scope.fields = response;
                        });
                        break;
                    }
                case "Radio Buttons Field":
                    {
                        var obj_rb = {
                            "id": Guid.raw(),
                            "label": "New Radio Buttons",
                            "type": "RADIOS",
                            "options": [{
                                "label": "Option X",
                                "value": "OPTION_X"
                            }, {
                                "label": "Option Y",
                                "value": "OPTION_Y"
                            }, {
                                "label": "Option Z",
                                "value": "OPTION_Z"
                            }]
                        };
                        FieldService.createFieldForForm($rootScope.selected_form_id, obj_rb).then(function(response) {
                            $scope.fields = response;
                        });
                        break;
                    }
            }
        };

        $scope.deleteField = function(field) {
            FieldService.deleteFieldFromForm($rootScope.selected_form_id, field.id).then(function(response) {
                $scope.fields = response;
            });
        };*/
    }
})();
