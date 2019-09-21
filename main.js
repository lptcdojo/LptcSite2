//loads in all the required packages (install them with the command "npm install")
const express = require("express");
const path = require("path");
const nunjucks = require("nunjucks");
const scratch = require("./scratch");
const store = require("./store");
const news = require("./news")
const secrets = require("./secrets1")

//load and initate things
const app = express();
const menuItems = [
	{ title: "Home", path: "/" },
	{ title: "News", path: news.basePath},
	{ title: "HTML", path: "/html/" },
	{ title: "Scratch", path: scratch.basePath }
];

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



//sends a selectable list of the ninja created pages
app.get("/html", (req, res) => {
	store.users.find({}, (err, docs) => {
		res.render("list.html", {
			items: docs,
			title: "Webpages",
			shortlink: "/ninjas/"
		});
	});
});

//sends general information about creators and source code
app.get("/info", (req, res) => {
	res.render("info.html");
});

app.use(secrets.basePath, secrets.routes);
app.use(scratch.basePath, scratch.routes);
app.use(news.basePath, news.routes);

//if the requested page is not found send them the error page
app.get("*", (req, res) => {
	store.dogs.find({}, (err,docs) => {
		res.render("error.html", {links: docs});
		console.log(docs);
	})
	
});

//startup the server
const server = app.listen(process.env.PORT || 8080, () => {
	console.log("Running");
	console.log(server.address());
});
