//loads in all the required packages (install them with the command "npm install")
const express = require("express");
const path = require("path");
const nunjucks = require("nunjucks");
const Datastore = require("nedb");

//load and initate things
const app = express();
const menuItems = [
  { title: "Home", path: "/" },
  { title: "News", path: "/news/"},
  { title: "HTML", path: "/html/" },
  { title: "Scratch", path: "/scratch/" }
];
//load databases
const scratchdb = new Datastore({
  filename: path.join(__dirname, "data/dbs/scratch.db"),
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

//initate templating engine
nunjucks
  .configure(path.join("data", "html"), {
    autoescape: true,
    express: app
  })
  .addGlobal("menuItems", menuItems);

//allows client to read files in the "data" folder
app.use(express.static(path.join(__dirname, "data")));

//sets the value of req.path to the requested page
app.use((req, res, next) => {
  res.locals.activePath = req.path;
  next();
});

//sends homepage
app.get("/", (req, res) => {
  res.render("home.html");
});

//sends a selectable list of the scratch games
app.get("/scratch", (req, res) => {
  scratchdb.find({}, (err, docs) => {
    res.render("listscratch.html", {
      items: docs,
      shortlink: "/playscratch?id="
    });
  });
});

//sends a selectable list of the ninja created games
app.get("/html", (req, res) => {
  userdb.find({}, (err, docs) => {
    res.render("list.html", {
      items: docs,
      title: "Webpages",
      shortlink: "/ninjas/"
    });
  });
});

//sends a selectable list of the news articles
app.get('/news', (req,res) => {
newsdb.find({}, (err,docs) => {
res.render('list.html', {items: docs, title: "Articles", shortlink: "/article?id="})
})
})


//sends a playable scratch game (loads game by id as a parameter)
app.get("/playscratch", (req, res) => {
  let id = req.query.id;
  res.render("playscratch.html", { id: id });
});

//sends an article (loads article by id as a parameter)
app.get('/article', (req,res) => {
let id=req.query.id;
newsdb.find({id:id}, (err,docs) => {
res.render("content.html", {content: docs[0].content, name: docs[0].name});
})
})



//hacker theme main page
app.get("/hacker", (req, res) => {
  scratchdb.find({}, (err, docs) => {
    var scratch = docs;
    userdb.find({}, (err, docs) => {
      var users = docs;
      res.render("hacker.html", { scratch: scratch, users: users });
    });
  });
});
//hacker theme scratch page
app.get("/hackerscratch", (req, res) => {
  let id = req.query.id;
  res.render("hackerscratch.html", { id: id });
});
//sends the "admin" page
app.get("/admin", (req,res) => { 
res.send(nunjucks.render("rickroll.html"))
})
//sends the "secret blah page"
app.get("/blah", (req,res) => {
res.render("blah.html")
})
//sends the "admin login" page
app.get("/login", (req,res) => {
res.render("login.html")
})
//if the requested page is not found send them the error page
app.get("*", (req, res) => {
  res.render("error.html");
});

//startup the server
const server = app.listen(process.env.PORT || 8080, () => {
  console.log("Running");
  console.log(server.address());
});
