module.exports = function(mongoose, db) {

    var FieldSchema=require("./field.schema.js")(mongoose);
    var FormSchema = mongoose.Schema({
        "title": String,
        "userId": String,
        "fields": [
        /*    {

                "label": String,
                "fieldType": {
                    type: String,
                    enum: ["TEXT", "TEXTAREA", "RADIO", "CHECKBOX", "SELECT", "DATE"]
                },
                "options": [{
                        label: String,
                        value: String
                    }

                ],
                "placeholder": String

            }*/
            FieldSchema
        ]
    }, {
        collection: "cs5610.assignment.form"
    });

    return FormSchema;

};
