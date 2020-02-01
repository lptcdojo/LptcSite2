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

//check is password correct
router.get("/verify", (req,res) => {
	let userpwd = req.query.pwd;
	if (userpwd == password) {
		res.send(true)
	} else {
		res.send(false)
	}
})

router.get("/changepwd", (req,res) => {
	let newpwd=req.query.newpwd
	let oldpwd=req.query.oldpwd
	if (newpwd != undefined && oldpwd != undefined) {
		/*https://stackoverflow.com/questions/21253019/change-a-file-using-node-js */
	} else {
		res.send("Params = oldpwd, newpwd")
	}
})

//send the contents of the scratch db
router.get("/readscratch", (req,res) => {
	scratchdb.find({}, (err,docs) => {
		res.send(docs)
	})

})

//remove scratch game, must have params of pwd (server password), gameid (id of the game you want to delete) and username (username of the owner of the game)
router.get("/removescratchgame", (req,res) => {
	let userpwd = req.query.pwd;
	let gameid = req.query.gameid;
	let username = req.query.username;
	if (userpwd == password) {
		scratchdb.find({games: { $elemMatch: { id:gameid } } }, (err,docs) => {
			console.log(docs)
		})
		scratchdb.update({username:username}, {$pull: {games: { id:gameid }  }}, {}, (err, numRemoved) => {
			res.send(numRemoved + " items deleted")
		})
	} else {
		res.send("Parameters = pwd, gameid, username")
	}
})

//add scratch game, must have params of pwd (server password), gameid (scratch id of the game you want to add), gamename (what the game is called) and username (username of the owner of the game)
router.get("/addscratchgame", (req,res) => {
	let userpwd = req.query.pwd;
	let gameid = req.query.gameid;
	let username = req.query.username;
	let name = req.query.gamename;
	if (userpwd == password) {
		if (gameid != undefined && username != undefined && name != undefined) {
			console.log("adding game")
			scratchdb.update({username:username}, { $addToSet: { games: {name:name, id: gameid} } }, {}, () => {})
			scratchdb.find({"username":username}, (err,docs) => {
				if (docs.length != 0) {
					console.log(docs)
					res.send(docs)
				} else {
					scratchdb.insert({username:username, games:[{name:name,id:gameid}]}, function (err, newDoc) {res.send(newDoc)});
				}
				
			})
		} else {
			res.send("Missing one or more Parameters<br>Parameters = pwd, gameid, username, gamename")
		}
	} else {
		res.send("Incorrect Password<br>(Parameters = pwd, gameid, username, gamename)")
	}
})

//Remove Scratch User, must have param of username
router.get("/removescratchprofile", (req,res) => {
	let name = req.query.username;
	scratchdb.remove({username:name}, (err,numRemoved) => {res.send(numRemoved + " User/s deleted")})
})

//Versions of add and remove that send a form to make it quicker and less confusing
router.get("/addscratchgamegui", (req,res) => {
	res.render("form.html", {params:["pwd","gameid","username","gamename"], title:"Add Scratch Game", link:"/db/addscratchgame"})
})

router.get("/removescratchgamegui", (req,res) => {
	res.render("form.html", {params:["pwd","gameid","username"], title:"Remove Scratch Game", link:"/db/removescratchgame"})
})

router.get("/removescratchprofilegui", (req,res) => {
	res.render("form.html", {params:["username"], title:"Remove Scratch user", link:"/db/removescratchprofile"})
})

router.get("*", (req,res) => {
	res.send("Pages: <br>/verify<br>/readscratch<br>/removescratchprofilegui<br>/removescratchgamegui<br>/addscratchgamegui")
})

module.exports = {
	scratch: scratchdb,
	users: userdb,
	news: newsdb,
	dogs: dogdb,
	routes: router,
	basePath: basePath
};