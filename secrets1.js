const express = require('express');
const router = express.Router();
const store = require("./store");
const basePath = "/other/";

router.use((req, res, next) => {
  res.locals.activePath = basePath;
  next();
});

//hacker theme main page
router.get("/hacker", (req, res) => {
  store.scratch.find({}, (err, docs) => {
    var scratch = docs;
    store.users.find({}, (err, docs) => {
      var users = docs;
      res.render("hacker.html", { scratch: scratch, users: users, shortlink: "/other/hackerscratch?id=" });
    });
  });
});
//hacker theme scratch page
router.get("/hackerscratch", (req, res) => {
  let id = req.query.id;
  store.scratch.find({ "games.id": id}, (err,docs) => {
  res.render("hackerscratch.html", { id: id, profile: docs, shortlink: `${basePath}play?id=`});})
});
//sends the "admin" page
router.get("/admin", (req,res) => { 
  res.render("rickroll.html")
})
//sends the "secret blah page"
router.get("/blah", (req,res) => {
  res.render("blah.html")
})
//sends the "admin login" page
router.get("/login", (req,res) => {
  res.render("login.html")
})

//rick roll
router.get("*", (req,res) => {
  res.render("rickroll.html")
})

module.exports = {
	routes: router,
	basePath: basePath
};