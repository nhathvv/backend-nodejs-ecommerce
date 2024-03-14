const Cart = require('../../models/cart.model');
const cartId = async(req, res, next) => {
    const cartId = req.cookies.cartId;
    if (!cartId) {
        const cart = new Cart();
        await cart.save();
        const expriesCookie = 365*24*60*60*1000;
        res.cookie("cartId",cart.id,{expries: new Date(Date.now() + expriesCookie)})
    }else {
        const cart = await Cart.findOne({
            _id: cartId
        });
        if(cart) {
            cart.totalQuantity = cart.products.reduce((total, product) => total + product.quantity, 0);
            res.locals.miniCart = cart;
        }
    }
    next();
}
module.exports = {
    cartId,
}