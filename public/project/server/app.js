module.exports = function(app, mongoose, db) {
    var model = require("./models/user.model.js")(mongoose, db);
    require("./services/user.service.js")(app, model);

    var model2 = require("./models/review.model.js")(mongoose, db);
    require("./services/review.service.js")(app, model2);

};
