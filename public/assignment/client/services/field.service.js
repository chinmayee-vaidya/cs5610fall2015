(function() {
    "use strict";
    angular.module("FormBuilderApp")
        .factory("FieldService", FieldService);


        function FieldService($http,$q){

            var api={
                findFieldsForForm:findFieldsForForm,
                addFieldForm:addFieldForm,
                deleteFieldForm:deleteFieldForm
            };

            return api;

            function deleteFieldForm(fid,field)
            {
                var deferred=$q.defer();
                var feid=field;
                $http.delete("/api/assignment/form/"+fid+"/field/"+feid).success(function(response){
                    deferred.resolve(response);
                });
                return deferred.promise;
            }

            function addFieldForm(fid,field){
                var deferred=$q.defer();
                $http.post("/api/assignment/form/"+fid+"/field",field).success(function(response){

                    deferred.resolve(response);

                });

                return deferred.promise;
            }

            function findFieldsForForm(formId)
            {
                var deferred=$q.defer();

                $http.get("/api/assignment/form/"+formId+"/field").success(function(response){

                    deferred.resolve(response);

                });

                return deferred.promise;
            }

        }


    })();
