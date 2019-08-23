const Datastore = require("nedb");
const path = require("path");
const fs = require("fs");
//load database
const dogdb = new Datastore({
	filename: path.join(__dirname, "data/dbs/dogs.db"),
	autoload: true
});
console.log("Database Loaded");

//clear database
dogdb.remove({}, { multi: true }, function (err, numRemoved) {
	console.log("Database Cleared");
});

//find each item in dog image folder and put its name in the database
const imgpath = path.join(__dirname,'data','imgs','dogs')
fs.readdir(imgpath, (err,files) => {
	console.log(files);
	files.forEach((file) => {
		console.log(file);
		dogdb.insert( {img:file} );
	})
})

