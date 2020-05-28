var express = require("express")
var app = express()
var bodyParser = require("body-parser")
var mongoose=require("mongoose")
var methodOverride=require("method-override")
var Person = require("./models/person")

// mongoose.connect("mongodb://localhost/PhoneBook",{
// useUnifiedTopology:true,
// useNewUrlParser:true,
// useCreateIndex:true
// }).then(() =>console.log("DB Connected!"))
// .catch(err =>{
//     console.log("DB Connection Error : $(err.message)");
// });

//"mongodb+srv://ritik31:ritik1212@cluster0-dqpfo.mongodb.net/test?retryWrites=true&w=majority"

Person.create({
    name:'Ritik Goel',
    dob:'31/DEC/1999',
    email_id:'goelritik31@gmail.com',
    phone:"9958358423"
},function(err,newPeron){
    if(err){
        console.log(err);
    }else{
    }
});

mongoose.connect("mongodb+srv://ritik31:ritik1212@cluster0-dqpfo.mongodb.net/test?retryWrites=true&w=majority",{
useUnifiedTopology:true,
useNewUrlParser:true,
useCreateIndex:true
}).then(() =>console.log("DB Connected!"))
.catch(err =>{
    console.log("DB Connection Error : $(err.message)");
});


var PersonRoutes=require("./routes/person")

app.use(PersonRoutes);
app.set("view engine","ejs")
app.set("port",process.env.PORT||8080)
console.log("server is running")
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.get("/",function(req,res){
    Person.find({},function(err,allperson){
        if(err){
            console.log(err);
        }
        else{
            res.render("index",{person:allperson});
        }
    });
});
app.listen(app.get("port"))
