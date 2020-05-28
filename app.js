var express = require("express")
var app = express()
var bodyParser = require("body-parser")
app.set("view engine","ejs")
app.set("port",process.env.PORT||8080)
console.log("server is running")
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.get("/",function(req,res){
    res.render("index");
})
app.listen(app.get("port"))
