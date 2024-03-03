const mongoose = require("mongoose");
const generateHelper = require("../helpers/generate")

const accountSchema = new mongoose.Schema({
    fullName : String,
    email : String,
    password: String,
    token : {
        type : String,
        default : generateHelper.generateRandomstring(16)
    },
    phone : String,
    avatar : String,
    role_id : String,
    status : String,
    deleted : {
        type : Boolean,
        default : false
    },
    deletedAt : Date
    
},{timestamps : true});
const Account = mongoose.model('Account', accountSchema,"accounts");
module.exports = Account;