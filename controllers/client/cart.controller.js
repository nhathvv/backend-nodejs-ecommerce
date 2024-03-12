const Cart = require('../../models/cart.model');
const addPost = async (req, res) => {
    const cartId = req.cookies.cartId;
    const productId = req.params.productId;
    const quantity = parseInt(req.body.quantity);
    const cart = await Cart.findOne({
        _id: cartId
    });
    const exitsProduct = cart.products.find(product => product.product_id === productId);
    if (exitsProduct) {
        exitsProduct.quantity += quantity;
        await Cart.updateOne({
            _id: cartId,
            "products.product_id": productId
        }, {
            $set: {
                "products.$.quantity": exitsProduct.quantity
            }
        })
    }else {
        const objectProduct = {
            product_id : productId,
            quantity : quantity
        }
        await Cart.updateOne({_id: cartId}, {$push: {products: objectProduct}});
    }
    res.redirect("back");
}
module.exports = {
    addPost
}