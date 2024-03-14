const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const orderSchema = new mongoose.Schema({
    cart_id : String,
    userInfo: {
        fullName: String,
        phone : String,
        address: String,
    },
    products :[
        {
            product_id : String,
            quantity : Number,
            price : Number,
            discountPercentage : Number,
        }
    ],
    deleted : {
        type : Boolean,
        default : false
    },   
    deletedAt : {
        type : Date,
        default : null
    }
},{timestamps : true});
const Order = mongoose.model('Order', orderSchema,"orders");
module.exports = Order;