//mongodb commands: http://howtonode.org/node-js-and-mongodb-getting-started-with-mongojs
//http://docs.mongodb.org/manual/reference/mongo-shell/

/*var databaseURI = "localhost:27017/somedb";
var collections = ["users", "blogs"];
var db = require("mongojs").connect(databaseURI, collections);

module.exports = db;

and then just require it where you need to connect to mongo like:

var db = require("./db");
*/
/*var databaseUrl = "mongodb://admin:admin@ds145289.mlab.com:45289/sampledb";
var mongojs = require('mongojs')
var db = mongojs(databaseUrl);
var test = db.collection('status')


test.find(function (err, docs) {
    if(err)throw new Error(err)
    console.log('DOCS',docs)
})*/


var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('sampledb', ['tasks']);


var bodyParser = require('body-parser');

app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/tasks', function(req, res){
	console.log('Received find all tasks request');
	db.tasks.find(function(err, docs){
		console.log(docs);
		res.json(docs);
	})
});

app.get('/task/:id', function(req, res){
	console.log('Received findOne task request');
	db.tasks.findOne({_id: new mongojs.ObjectId(req.params.id)}, function(err, docs){
		console.log(docs);
		res.json(docs);
	})
});

app.post('/addTask', function(req, res){
	console.log(req.body);
	db.tasks.insert(req.body, function(docs){
		console.log(docs);
		res.json(docs);
	})
});

app.delete('/deleteTask/:id', function(req, res){
	console.log("Received delete one task request...");
	db.tasks.remove({_id: new mongojs.ObjectId(req.params.id)}, function(err, docs){
		console.log(docs);
		res.json(docs);
	});
});

app.put('/updateTask', function(req, res){
	console.log("Received updateTask request");
	db.tasks.findAndModify({query: {"_id": new mongojs.ObjectId(req.body._id)},
										update: {$set: {rate: req.body.rate, type: req.body.type}}
										}, function(err, docs){
											console.log(docs);
											res.json(docs);
										})
	});

//app.use(express.static(__dirname + "/app/views"));
app.listen(3000);
console.log("server running on port 3000");