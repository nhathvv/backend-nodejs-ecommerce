const mongoose = require("mongoose");
const generateHelper = require("../helpers/generate")

const userSchema = new mongoose.Schema({
    fullName : String,
    email : String,
    password: String,
    tokenUser : {
        type : String,
        default : generateHelper.generateRandomstring(16)
    },
    phone : String,
    avatar : String,
    status : {
        type : String,
        default : "active"
    },
    deleted : {
        type : Boolean,
        default : false
    },
    deletedAt : Date
    
},{timestamps : true});
const User = mongoose.model('User', userSchema,"users");
module.exports = User;