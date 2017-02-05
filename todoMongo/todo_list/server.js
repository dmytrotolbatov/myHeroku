var constants = require("./constants.js");
var express = require("express");
var bodyParser = require("body-parser");
var mongoClient = require("mongodb").MongoClient;
var objectId = require("mongodb").ObjectId;

var app = express();
var jsonParser = bodyParser.json();

app.use(express.static(__dirname + "/public"));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8061');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// get to do list
app.get(constants.toDoPath, function (req, res) {
    mongoClient.connect(constants.dbConnection, function (err, db) {
        db.collection(constants.dbToDos)
            .find({isCompleted: false})
            .toArray(function (err, toDos) {
                res.send(toDos);
                db.close();
            });
    });
});

// get completed list
app.get(constants.completedPath, function (req, res) {
    mongoClient.connect(constants.dbConnection, function (err, db) {
        db.collection(constants.dbToDos)
            .find({isCompleted: true})
            .toArray(function (err, toDos) {
                res.send(toDos);
                db.close();
            });
    });
});

// add to do
app.post(constants.toDoPath, jsonParser, function (req, res) {
    if(!req.body)
        return res.sendStatus(400).send();

    var toDo = {
        value: req.body.value,
        isCompleted: false
    };

    mongoClient.connect(constants.dbConnection, function(err, db){
        db.collection(constants.dbToDos)
            .insertOne(toDo, function(err, result){
            if(err)
                return res.status(400).send();

            res.send(toDo);
            db.close();
        });
    });
});

// update to do
app.put(constants.toDoPath, jsonParser, function (req, res) {
    if (!req.body)
        return res.sendStatus(400).send();
    var id = req.body._id;

    mongoClient.connect(constants.dbConnection, function (err, db) {
        db.collection(constants.dbToDos)
            .findOneAndUpdate({"_id" : objectId(id)},
                {$set: {"isCompleted": req.body.isCompleted, "value": req.body.value}},
                {returnOriginal: false},
                function (err, result) {
                    if (err)
                        return res.sendStatus(400).send();

                    var toDo = {
                        _id: result.value._id,
                        value: result.value.value,
                        isCompleted: result.value.isCompleted
                    };
                    res.send(toDo);
                    db.close();
                });
    });
});

// delete to do
app.delete(constants.toDoPath + "/:id", function (req, res) {
    var id = new objectId(req.params.id);

    mongoClient.connect(constants.dbConnection, function (err, db) {
        db.collection(constants.dbToDos)
            .findOneAndDelete({"_id": id}, function (err, result) {
                if(err)
                    return res.status(400).send();
                res.send(result.value);
                db.close();
            });
    });
});

// to completed
app.put(constants.completedPath, jsonParser, function (req, res) {
    if (!req.body)
        return res.sendStatus(400).send();
    var id = req.body._id;

    mongoClient.connect(constants.dbConnection, function (err, db) {
        db.collection(constants.dbToDos)
            .findOneAndUpdate({"_id" : objectId(id)},
                {$set: {"isCompleted": true}},
                {returnOriginal: false},
                function (err, result) {
                    if (err)
                        return res.sendStatus(400).send();

                    var toDo = {
                        id: id,
                        value: req.body.value,
                        isCompleted: req.body.isCompleted
                    };
                    res.send(toDo);
                    db.close();
                });
    });
});

app.listen(8060, function () {
    console.log("Server waiting connection");
});
