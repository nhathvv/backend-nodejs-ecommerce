const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");
const Order = require("../../models/order.model");
const productHelper = require("../../helpers/product");
//[GET] /checkout
const index = async (req, res) => {
    const cartId = req.cookies.cartId;
    const cart = await Cart.findOne({
        _id: cartId
    });
    for(item of cart.products){
        const productId = item.product_id;
        const productInfo = await Product.findOne({
            _id: productId
        }).select("title thumbnail slug price discountPercentage");
        item.productInfo = productInfo;
        productHelper.priceNewProduct(item.productInfo);
        item.totalPrice = item.productInfo.priceNew * item.quantity;
    }
    if(cart) {
        cart.totalPrice = cart.products.reduce((total, item) => {
            return total + item.totalPrice;
        }, 0);
    }
    res.render("client/pages/checkout/index",{
        pageTitle: "Đặt hàng",
        cartDetail: cart
    })
}
// [POST] /checkout/order
const order = async(req,res) => {
    const cartId = req.cookies.cartId;
    const userInfo = req.body;
    const cart = await Cart.findOne({
        _id: cartId
    });
    const products = [];
    for(const product of cart.products){
        const productInfo = await Product.findOne({
            _id: product.product_id
        }).select("title price discountPercentage");
        products.push({
            product_id: product.product_id,
            quantity: product.quantity,
            price: productInfo.price,
            discountPercentage: productInfo.discountPercentage
        });
    }

    const order = new Order({
        cart_id: cartId,
        userInfo: userInfo,
        products: products
    });
    await order.save();
    await Cart.updateOne({
        _id: cartId
    },{
        products: []
    })
    res.redirect(`/checkout/success/${order.id}`);
}
// [GET] /checkout/success/:orderId
const success = async(req,res) => {
    const orderId = req.params.orderId;
    const order = await Order.findOne({
        _id: orderId
    });
    for(const product of order.products){
        const productInfo = await Product.findOne({
            _id: product.product_id
        }).select("title thumbnail price discountPercentage ");
        productHelper.priceNewProduct(product);
        product.productInfo = productInfo;
        product.totalPrice = product.priceNew * product.quantity;
    }
    order.totalPrice = order.products.reduce((total, item) => {
        return total + item.totalPrice;
    }, 0);
    res.render("client/pages/checkout/success",{
        pageTitle: "Đặt hàng thành công",
        order : order,
    })
}
module.exports = {
    index,
    order,
    success,
}