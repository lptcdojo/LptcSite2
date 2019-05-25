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
  let id = req.query.id;
  res.render("playscratch.html", { id: id });
});

module.exports = {
	routes: router,
	basePath: basePath
};