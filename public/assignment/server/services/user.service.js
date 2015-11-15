module.exports = function(app, model, db) {

    var user_model = require("../models/user.model.js")(app);

    app.get('/api/assignment/user', function(req, res) {
        if (req.query.username !== undefined) {
            if (req.query.password !== undefined) {
                //return user which mathces username and password
                var credentials = {
                    username: req.query.username,
                    password: req.query.password
                };

                res.json(user_model.findUserByCredentials(credentials));

            } else {

                res.json(user_model.findUserByUsername(req.query.username));
            }
        } else {
            //return all users
            res.json(user_model.findAll());
        }

    });

    app.get('/api/assignment/user/:id', function(req, res) {
        var index = req.params.id;
        res.json(user_model.findById(index));
    });


    app.delete('/api/assignment/user/:id', function(req, res) {
        var index = req.params.id;
        res.json(user_model.remove(index));
    });

    app.post('/api/assignment/user', function(req, res) {
        var user = req.body;
        res.json(user_model.create(user));
    });

    app.put('/api/assignment/user/:id', function(req, res) {
        var user = req.body;
        var userId = req.params.id;
        user.id = userId;
        res.json(user_model.update(userId, user));
    });

};
