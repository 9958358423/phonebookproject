var express     = require("express");
var router      = express.Router();
var Person = require("../models/person");
// INDEX - Get all campgrounds
router.get("/",function(req,res){
    Person.find({},function(err,allperson){
        if(err){
            console.log(err);
        }
        else{
            res.render("index",{person:allperson});
        }
    });
});
module.exports = router;