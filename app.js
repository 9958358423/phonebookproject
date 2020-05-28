var express = require("express")
var app = express()
var bodyParser = require("body-parser")
var mongoose=require("mongoose")
var methodOverride=require("method-override")

// mongoose.connect("mongodb://localhost/PhoneBook",{
// useUnifiedTopology:true,
// useNewUrlParser:true,
// useCreateIndex:true
// }).then(() =>console.log("DB Connected!"))
// .catch(err =>{
//     console.log("DB Connection Error : $(err.message)");
// });


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://ritik31:<ritik1212>@cluster0-dqpfo.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


app.set("view engine","ejs")
app.set("port",process.env.PORT||8080)
console.log("server is running")
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.get("/",function(req,res){
    res.render("index");
})
app.listen(app.get("port"))
