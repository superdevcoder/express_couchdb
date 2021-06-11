require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const router = require('./routes');

const app = express();

// const NodeCouchdb = require('node-couchdb');  
  
// const couch = NodeCouchdb({  
// 	auth:{  
// 		user: process.env.COUCHBASE_APPLICATION_USER,
// 		password: process.env.COUCHBASE_APPLICATION_PASSWORD
// 	}  
// });

// couch.listDatabases().then(function(dbs){  
// console.log(dbs);  
// });  

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'HEAD, OPTIONS, GET, POST, PUT, DELETE');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	next();
});

// app.set('views', path.join(__dirname, 'views'));
// app.get('/', function(req,res){  
//  res.render('index');  
// });

app.use('/api', router);

app.get('*', function(req, res){
	res.status(404).send('404, page not found');
});

const server = app.listen(3000, function() {
	console.log("Listen on port %s...", server.address().port);
});