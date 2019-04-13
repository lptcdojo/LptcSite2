const express = require("express")

const app = express()


app.get("/", (req,res) => {
	res.send("Hello World!")
})

const server = app.listen(process.env.PORT || 8080, () =>{
	console.log("Running")
	console.log(server.address());
})