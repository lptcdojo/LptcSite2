
const Datastore = require('nedb');
const path = require('path');
htmldb= new Datastore({filename:path.join(__dirname, 'data/dbs/scratch.db'), autoload: true})
var link1={name: "Shoot The Balls", id: "172416456"}
var link2={id: "65515784", name: "Haunted House of ?"}
var user1={username: "Jake", games: [{name: "Shoot The Balls", id: "172416456"},  {id: "65515784", name: "Haunted House of ?"}]}
var user2={username:"Comicclub",games:[{name:"Poo Run Live",id:"120713971"},{id:"200518247",name:"The Legend of jimmy the Talking Toast"}]}
htmldb.insert(user1, function (err, newDoc) {});
htmldb.insert(user2, function (err, newDoc) {});
