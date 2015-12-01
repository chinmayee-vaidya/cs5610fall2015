var q = require("q");

module.exports = function(mongoose, db) {
    var FormSchema = require("./form.schema.js")(mongoose);
    var FormModel = mongoose.model("FormModel", FormSchema);

    var api = {

        getFormByUser: getFormByUser,
        findAllForms: findAllForms,
        addForm: addForm,
        get: get,
        del: del,
        deleteById: deleteById,
        formById: formById,
        addFieldForForm: addFieldForForm,
        deleteField: deleteField,
        updateForm: updateForm


    };
    return api;

    function updateForm(fid, form) {



        var deferred = q.defer();
        var new_form = form;


        FormModel.findByIdAndUpdate(fid, { $set:new_form}, function(err,form){

            deferred.resolve(form);

        });

        return deferred.promise;

    }

    function del(fid) {
        var deferred = q.defer();

        FormModel.findByIdAndRemove(fid, function(err, form) {
            deferred.resolve(form);

        });

        return deferred.promise;
    }

    function get(fid) {

        var deferred = q.defer();
        FormModel.find({
            _id: fid
        }, function(err, form) {

            if (err) console.log(err);
            deferred.resolve(form);

        })

        return deferred.promise;

    }



    function findAllForms() {

        var deferred = q.defer();
        FormModel.find(function(err, users) {
            deferred.resolve(users);

        });
        return deferred.promise;


    }

    function deleteField(form, field) {
        var deferred = q.defer();

        FormModel.findById(form, function(err, form) {
            form.fields.splice(field, 1);
            form.save(function(err, form) {
                deferred.resolve(form);
            });
        });

        return deferred.promise;

    }

    function addFieldForForm(fid, field) {
        var deferred = q.defer();


        FormModel.findById(fid, function(err, form) {
            form.fields.push(field);
            form.save(function(err, form) {
                
                deferred.resolve(form);
            });
        });


        return deferred.promise;
    }

    function formById(fid) {
        var deferred = q.defer();
        FormModel.find({
            _id: fid
        }, function(err, form) {

            if (err) console.log(err);
            deferred.resolve(form);

        })

        return deferred.promise;

    }

    function deleteById(fid, uid) {

        //console.log("In model");

        var deferred = q.defer();
        //console.log("Model user id");
        //console.log(uid);

        FormModel.remove({
            _id: fid
        }, function(err, status) {
            if (err) {
                //console.log(err);
            } else {
                FormModel.find({
                    userId: uid
                }, function(err, forms) {
                    if (err) console.log(err)
                    deferred.resolve(forms);

                });
            }
        });

        return deferred.promise;
    }


    function getFormByUser(uid) {

        var deferred = q.defer();
        FormModel.find({
            userId: uid
        }, function(err, form) {

            deferred.resolve(form);

        });

        return deferred.promise;


    }

    function addForm(form) {

        var deferred = q.defer();
        var uid = form.userId;


        FormModel.create(form, function(err, form) {
            if (err) console.log(err);

            FormModel.find({
                userId: uid
            }, function(err, forms) {

                if (err) console.log(err)

                deferred.resolve(forms);

            });
        });

        return deferred.promise;

    }
};
