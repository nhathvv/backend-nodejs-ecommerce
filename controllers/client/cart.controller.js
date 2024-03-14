const Cart = require('../../models/cart.model');
const Product = require('../../models/product.model');
const productHelper = require('../../helpers/product');
// [GET] /cart
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
    res.render("client/pages/carts/index", {
        cartDetail: cart
    })
}
//[POST] /cart/add/:productId
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
//[GET] /delete/:productId
const deleteProduct = async (req, res) => {
    const cartId = req.cookies.cartId;
    const productId = req.params.productId;
    try {
        await Cart.updateOne({
            _id: cartId
        }, {
            $pull: {
                products: {
                    product_id: productId
                }
            }
        })
        req.flash("success", "Xóa sản phẩm thành công");
    } catch (error) {
        req.flash("error", "Xóa sản phẩm thất bại");
    }
    res.redirect("back");
}
//[GET] /update/:productId/:quantity
const updateQuantity = async (req, res) => {
    const cartId = req.cookies.cartId;
    const productId = req.params.productId;
    const quantity = parseInt(req.params.quantity);
    await Cart.updateOne({
        _id: cartId,
        "products.product_id": productId
    }, {
        $set: {
            "products.$.quantity": quantity
        }
    })
    res.redirect("back");
}
module.exports = {
    index,
    addPost,
    deleteProduct,
    updateQuantity,
}