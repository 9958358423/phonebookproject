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

// Person.create({
//     name:'Prateek Gupta',
//     dob:'14/11/1999',
//     email_id:'prateekgupta@gmail.com',
//     phone:"9488451569"
// },function(err,newPeron){
//     if(err){
//         console.log(err);
//     }else{
//     }
// });

mongoose.connect("mongodb+srv://ritik31:ritik1212@cluster0-dqpfo.mongodb.net/test?retryWrites=true&w=majority",{
useUnifiedTopology:true,
useNewUrlParser:true,
useCreateIndex:true
}).then(() =>console.log("DB Connected!"))
.catch(err =>{
    console.log("DB Connection Error : $(err.message)");
});

app.set("view engine","ejs")
app.set("port",process.env.PORT||8080)
console.log("server is running")
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.static("public"))
app.use(methodOverride("_method"))


//landing page
app.get("/",function(req,res){
    res.render("landing");
})


//index page
app.get("/person",function(req,res){
    const queryObj={}
    if(req.query.Search != null){
        console.log('herererererer',req.query.Search);
        queryObj["name"]={'$regex': req.query.Search ,$options:'i'}
    }
    Person.find(queryObj,function(err,allperson){
        if(err){
            console.log(err);
        }
        else{
            res.render("index",{person:allperson});
        }
    }).sort('name');
});


//new page - show new form
app.get("/person/new",function(req,res){
    res.render("new");
})


//new page - post route
app.post("/person/new",function(req,res){
    name=req.body.name,
    date=req.body.date,
    email_id=req.body.email_id;
    phone=req.body.phone;
    var newPerson = {name:name,dob:date,email_id:email_id,phone:phone}
    Person.create(newPerson,function(err,person){
        if(err){
            console.log(err);
        }else{
            res.redirect("/person");
        }
    })
})


//show person details
app.get("/person/:id",function(req,res){
    Person.findById(req.params.id,function(err,foundPerson){
        if(err){
            console.log(err);
        }else{
            res.render("personDetails",{person:foundPerson});
        }
    })
})




//edit page - show form
app.get("/person/edit/:id",function(req,res){
    Person.findById(req.params.id,function(err,foundPerson){
        if(err){
            console.log(err);
        }else{
            res.render("edit",{person:foundPerson});
        }
    })
})



//edit page - update details
app.put("/person/edit/:id",function(req,res){
    Person.findByIdAndUpdate(req.params.id,req.body.person,function(err,newPeron){
        if(err){
            console.log(err);
        }else{
            res.redirect("/person");
        }
    })
})



//delete route
app.delete("/person/:id",function(req,res){
    // console.log(req.body._id);
    Person.findByIdAndRemove(req.params.id,function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect("/person");
        }
    })
})

app.listen(app.get("port"))
