var mongoose = require("mongoose");
//Schema setup
var personSchema = new mongoose.Schema({
    name:String,
    dob:String,
    email_id:String,
    phone:String
});
module.exports = mongoose.model("Person",personSchema);