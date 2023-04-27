const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    profile : String,
    name : String,
    bio : String,
    phone:Number,
    email : String,
    pass : String
}) 

const UserModel = mongoose.model("user",userSchema);

module.exports={
    UserModel,
}