(function() {
    "use strict";
    angular.module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($scope, $location, $rootScope, $routeParams,  FieldService) {
        $scope.fields = [];

        if ($routeParams.formId !== undefined) {
            FieldService.getFieldsForForm($routeParams.formId ).then(function(fields) {
                $scope.fields = fields;
            });
			$rootScope.selected_form_id=$routeParams.formId;
        }

        $scope.addField = function(fieldType) {
            switch (fieldType) {
                case "Single Line Text Field":
                    {
                        var obj_sl = {
                            "id": Guid.raw(),
                            "label": "New Text Field",
                            "type": "TEXT",
                            "placeholder": "New Field"
                        };
                        FieldService.createFieldForForm($rootScope.selected_form_id, obj_sl).then(function(response){
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
                        FieldService.createFieldForForm($rootScope.selected_form_id, obj_ml).then(function(response){
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
                        FieldService.createFieldForForm($rootScope.selected_form_id, obj_dt).then(function(response){
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
                        FieldService.createFieldForForm($rootScope.selected_form_id, obj_dd).then(function(response){
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
                        FieldService.createFieldForForm($rootScope.selected_form_id, obj_cb).then(function(response){
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
                                }
                            ]
                        };
                        FieldService.createFieldForForm($rootScope.selected_form_id, obj_rb).then(function(response){
                            $scope.fields = response;
                        });
                        break;
                    }
            }
        };

        $scope.deleteField = function(field) {
            FieldService.deleteFieldFromForm($rootScope.selected_form_id, field.id).then(function(response){
                $scope.fields = response;
            });
        };
    }
})();
