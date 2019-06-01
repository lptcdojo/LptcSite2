const express = require('express');
const router = express.Router();
const store = require("./store");
const basePath = "/scratch/";

router.use((req, res, next) => {
	res.locals.activePath = basePath;
	next();
});

//sends a selectable list of the scratch games
router.get("/", (req, res) => {
	store.scratch.find({}, (err, docs) => {
		res.render("listscratch.html", {
			items: docs,
			shortlink: `${basePath}play?id=`
		});
	});
});

//sends a playable scratch game (loads game by id as a parameter)
router.get("/play", (req, res) => {
	var id = req.query.id;
	var rnd= req.query.random;
	
	var random = false
	if (rnd == 1) {
		random = true;
	}
	store.scratch.find({ "games.id": id}, (err,docs) => {
	res.render("playscratch.html", { id: id, button: random, profile: docs, shortlink: `${basePath}play?id=`});})
	
});

//sends a random playable scratch game
router.get("/random", (req,res) => {
	store.scratch.find({}, (err,docs) => {
		var itemnumuser=Object.keys(docs).length;
	var usernum=Math.floor(Math.random() * Math.floor(itemnumuser))
	var itemnumgame=Object.keys(docs[usernum].games).length
	var gamenum=Math.floor(Math.random() * Math.floor(itemnumgame))
	var id=docs[usernum].games[gamenum].id
	store.scratch.find({ "games.id": id}, (err,docs) => {
		var profile = docs
		res.render("playscratch.html", {id: id, button: true, profile:docs, shortlink: `${basePath}play?id=`})
})
	
	})

})

module.exports = {
	routes: router,
	basePath: basePath
};