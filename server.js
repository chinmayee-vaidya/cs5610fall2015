#!/bin/env node
 //  OpenShift sample Node application
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var mongoose=require('mongoose');
var connectionString = 'mongodb://127.0.0.1:27017/cs5610fall2015exmpl1';

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}
 mongoose.connect(connectionString);
var db=mongoose.connection;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

//require("./public/assignment/server/services/user.service.js")(app);
//require("./public/assignment/server/services/form.service.js")(app);
//require("./public/assignment/server/services/field.service.js")(app);
//require("./public/Web/server/services/user.service.js")(app);
require("./public/assignment/server/app.js")(app,mongoose,db);
//require("./public/mongo/server/app.js")(app,mongoose,db);
//require("./public/dummy/server/app.js")(app,mongoose,db);
//require("./public/project/server/app.js")(app,mongoose,db);


app.get('/hello', sayHello);
app.get('/json', function(req, res) {
    var course = {
        title: 'Java 101',
        seats: 23,
        start: new Date()
    };
    res.send(course);
});

app.get('/course', function(req, res) {
    var courses = [{
            title: 'Java 101',
            seats: 12,
            start: new Date()
        }, {
            title: 'C# 101',
            seats: 12,
            start: new Date()
        }, {
            title: 'ASP.NET 101',
            seats: 12,
            start: new Date()
        }, {
            title: 'Node.js 101',
            seats: 12,
            start: new Date()
        }, {
            title: 'AngularJS 101',
            seats: 12,
            start: new Date()
        }

    ];
    res.json(courses);

});


function sayHello(req, res) {
    console.log("hellozz");
    res.send('<h1>Say Hello</h1>');
}

function sayJson() {

}
app.listen(port, ipaddress);
