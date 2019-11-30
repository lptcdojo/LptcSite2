const Datastore = require("nedb");
const path = require("path");
const express = require('express');
const router = express.Router();
const fs = require("fs");
const basePath = "/db/"
var password
//load databases

router.use((req, res, next) => {
  res.locals.activePath = basePath;
  next();
});

const scratchdb = new Datastore({
	filename: path.join(__dirname, "data/dbs/scratch.db"),
	autoload: true
});
const dogdb = new Datastore({
	filename: path.join(__dirname, "data/dbs/dogs.db"),
	autoload: true
});
const userdb = new Datastore({
	filename: path.join(__dirname, "data/dbs/users.db"),
	autoload: true
});
const newsdb = new Datastore({
	filename: path.join(__dirname, "data/dbs/news.db"),
	autoload: true
});


//load password
fs.readFile("pwd.txt", function(err, buf) {
	password = buf.toString()
  	console.log(password)
});

router.get("/verify", (req,res) => {
	let userpwd = req.query.pwd;
	if (userpwd == password) {
		res.send(true)
	} else {
		res.send(false)
	}
})


module.exports = {
	scratch: scratchdb,
	users: userdb,
	news: newsdb,
	dogs: dogdb,
	routes: router,
	basePath: basePath
};