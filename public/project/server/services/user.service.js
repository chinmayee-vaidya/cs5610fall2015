module.exports = function(app, model) {

    var user_model = model;

    app.get('/api/project/user', function(req, res) {
        if (req.query.username !== undefined) {
            if (req.query.password !== undefined) {
                //return user which mathces username and password
                var credentials = {
                    username: req.query.username,
                    password: req.query.password
                };

                user_model
                .findUserByCredentials(credentials)
                .then(function(users){
                  res.json(users);

                });

            } else {

                user_model
                .findUserByUsername(req.query.username)
                .then(function(users){
                  res.json(users);

                });
            }
        } else {
            //return all users
            user_model
            .findAll()
            .then(function(users){
              res.json(users);

            });

        }


    });

    app.get('/api/project/user/:id', function(req, res) {
        var userId = req.params.id;
        //console.log("Extracted: "+userId);
        user_model.findById(userId).then(function(user){
            //console.log(user);
            res.json(user);
        });
    });

/*
    app.delete('/api/assignment/user/:id', function(req, res) {
        var index = req.params.id;
        res.json(user_model.remove(index));
    });
*/

app.delete('/api/project/user/:id', function(req, res) {
    console.log("server side delete");
    var userId = req.params.id;

    //console.log("sent req: "+user.username);
    user_model.deleteUser(userId).then(function(updated){
        res.json(updated);
    });
});
    app.post('/api/project/user', function(req, res) {
        var user = req.body;
        //console.log("Display"+user);
        user_model.create(user).then(function(users){
            //console.log(users);
            res.json(users);
        });
    });

    app.put('/api/project/user/:id', function(req, res) {
        console.log("Server service");
        var user = req.body;
        console.log(user);
        var userId = req.params.id;
        user.id = userId;
        //console.log("sent req: "+user.username);
        user_model.updateUser(userId, user).then(function(updated){
            res.json(updated);
        });
    });

};
