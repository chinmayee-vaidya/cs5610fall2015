module.exports = function(mongoose, db) {
    var FieldSchema = mongoose.Schema({
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
        });

    return FieldSchema;

};
