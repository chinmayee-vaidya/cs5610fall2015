(function() {
    "use strict";
    angular.module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http, $q) {

        var service = {};

        service.createFormForUser = function(userId, form) {

            var deferred = $q.defer();
            $http.post("/api/assignment/user/" + userId + "/form", form).success(function(response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        };

        service.findAllFormsForUser = function(userId) {
            var deferred = $q.defer();
            $http.get("/api/assignment/user/" + userId + "/form").success(function(response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        };

        service.deleteFormById = function(formId) {
            var deferred = $q.defer();
            $http.delete("/api/assignment/form/" + formId).success(function(response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        };

        service.updateFormById = function(formId, newForm) {

            var deferred = $q.defer();
            $http.put("/api/assignment/form/" + formId, newForm).success(function(response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        };

        return service;
    }

})();
