const express = require('express');
const router = express.Router();
const store = require("./store");
const basePath = "/news/";

router.use((req, res, next) => {
  res.locals.activePath = basePath;
  next();
});


//sends a selectable list of the news articles
router.get('/', (req,res) => {
store.news.find({}, (err,docs) => {
res.render('list.html', {items: docs, title: "Articles", shortlink: "/news/article?id="})
})
})


//sends an article (loads article by id as a parameter)
router.get('/article', (req,res) => {
let id=req.query.id;
store.news.find({id:id}, (err,docs) => {
res.render("content.html", {content: docs[0].content, name: docs[0].name});
})
})



module.exports = {
	routes: router,
	basePath: basePath
};