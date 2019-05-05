const express = require("express")
const path = require('path');
const nunjucks = require('nunjucks');
const Datastore = require('nedb');


const app = express()


scratchdb= new Datastore({filename:path.join(__dirname, 'data/dbs/scratch.db'), autoload: true})
userdb= new Datastore({filename:path.join(__dirname, 'data/dbs/users.db'), autoload: true})

nunjucks.configure(path.join('data', 'html'), {
	autoescape: true,
	express: app
});

app.get("/", (req,res) => {
	res.send(nunjucks.render('home.html'))
})
app.get("/scratch", (req,res) => {
	scratchdb.find({}, (err,docs) =>{
		res.send(nunjucks.render('list.html', {items: docs, title: "Scratch Games", shortlink: "/playscratch?id="}))
	})
})
app.get("/html", (req,res) => {
	userdb.find({}, (err,docs) => {
		res.send(nunjucks.render('list.html', {items: docs, title: "Webpages", shortlink: "/ninjas/"}))
	})
})
app.get("/playscratch", (req,res) => {
	let id = req.query.id;
	res.send(nunjucks.render('playscratch.html', {id:id}))
})
app.get("/hacker", (req,res) => {
	scratchdb.find({}, (err,docs) =>{
		var scratch = docs;
		userdb.find({}, (err,docs) => {
			var users=docs
			res.render("hacker.html", {scratch: scratch, users: users});
		})
	});
})

app.get("/hackerscratch", (req,res) => {
	let id = req.query.id;
	res.send(nunjucks.render('hackerscratch.html', {id:id}))
})


app.use(express.static(path.join(__dirname, 'data')))
app.get("*", (req,res) => {
	res.send(nunjucks.render("error.html"))
})
const server = app.listen(process.env.PORT || 8080, () =>{
	console.log("Running")
	console.log(server.address());
})