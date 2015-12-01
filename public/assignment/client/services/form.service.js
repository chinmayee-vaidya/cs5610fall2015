(function() {
    "use strict";
    angular.module("FormBuilderApp")
        .factory("FormService", FormService);

        function FormService($http,$q){

            var api={
                findFormsForUser:findFormsForUser,
                addForm:addForm,
                deleteForm:deleteForm,
                findAll:findAll,
                updateform:updateform

            };

            return api;

            function updateform(id,form)  {

                var deferred = $q.defer();
                $http.put("/api/assignment/form/" + id, form).success(function(response){
                    deferred.resolve(response);
                });
                return deferred.promise;

            }

            function findAll(){

                var deferred=$q.defer();
                $http.get("/api/assignment/user").success(function(response){
                    deferred.resolve(response);


                });

                return deferred.resolve(response);

            }

            function deleteForm(form)
            {
                var deferred=$q.defer();
                var fid=form._id;
                var userid=form.userId;

                $http.delete("/api/assignment/user/"+userid+"/form/" + fid).success(function(response) {
                    deferred.resolve(response);
                });
                return deferred.promise;
            }

            function findFormsForUser(uid)
            {

                var deferred = $q.defer();
                $http.get("/api/assignment/user/" + uid + "/form").success(function(response) {
                    deferred.resolve(response);
                });
                return deferred.promise;

            }

            function addForm(form)
            {

                var deferred = $q.defer();
                $http.post("/api/assignment/user/form", form).success(function(response) {
                    deferred.resolve(response);
                });
                return deferred.promise;

            }



        }

    })();
