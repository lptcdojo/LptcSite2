const Datastore = require("nedb");
const path = require("path");

//load databases
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


module.exports = {
	scratch: scratchdb,
	users: userdb,
	news: newsdb,
	dogs: dogdb
};