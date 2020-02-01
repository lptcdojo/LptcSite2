
const Datastore = require('nedb');
const path = require('path');
htmldb= new Datastore({filename:path.join(__dirname, 'data/dbs/scratch.db'), autoload: true})
var link1={name: "Shoot The Balls", id: "172416456"}
var link2={id: "65515784", name: "Haunted House of ?"}

var user1={username: "Jake", games: [
{name: "Shoot The Balls", id: "172416456"}, 
{id: "65515784", name: "Haunted House of ?"},
{name: "Treasure in the mine field: JTTT", id: "315870986"}]}

var user2={username:"Comicclub",games:[
{name:"Poo Run Live",id:"120713971"},
{id:"200518247",name:"The Legend of jimmy the Talking Toast"},
{name: "Treasure in the mine field: JTTT", id: "315870986"}]}
htmldb.remove({}, { multi: true }, function (err, numRemoved) {
	console.log("Database Cleared");
});
htmldb.insert(user1, function (err, newDoc) {});
htmldb.insert(user2, function (err, newDoc) {});
/*
var data = [
{name: "Shoot The Balls", id: "172416456", username: ["Jake"]},
{name: "Haunted House of ?", id: "65515784", username: ["Jake"]},
{name: "Treasure in the mine field: JTTT", id: "315870986", username: ["Comicclub", "Jake"]},
{name:"Poo Run Live", id:"120713971", username: "Comicclub"},
{name:"The Legend of jimmy the Talking Toast", id:"200518247", username: "Comicclub"}]*/
