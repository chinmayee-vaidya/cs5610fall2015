(function() {
    "use strict";
    angular.module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($http, $q) {

        var service = {};

        service.createFieldForForm = function(formId, field) {
            var deferred = $q.defer();
            $http.post("/api/assignment/form/" + formId + "/field", field).success(function(response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        };

        service.getFieldsForForm = function(formId) {
            var deferred = $q.defer();
            $http.get("/api/assignment/form/" + formId + "/field").success(function(response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        };

        service.getFieldForForm = function(formId, fieldId) {
            var deferred = $q.defer();
            $http.get("/api/assignment/form/" + formId + "/field/" + fieldId).success(function(response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        };

        service.deleteFieldFromForm = function(formId, fieldId) {

            var deferred = $q.defer();
            $http.delete("/api/assignment/form/" + formId + "/field/" + fieldId).success(function(response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        };

        service.updateField = function(formId, fieldId, field){
            var deferred = $q.defer();
            $http.put("/api/assignment/form/" + formId + "/field/" + fieldId, field).success(function(response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        };

        return service;
    }

})();
