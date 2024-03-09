const Product = require("../../models/product.model")
const productHelper = require("../../helpers/product")
// [GET] : /
const index = async (req, res) => {
    // Featured products
    let find = {
        featured : "1",
        status : "active",
        deleted : false
    }
    const products = await Product.find(find).limit(6)
    const productFeatured = productHelper.priceNewProducts(products)
    // End products featured
    // Products new
    const products1 = await Product.find({
        deleted : false,
        status:"active",
    }).limit(6).sort({position : "desc"})
    const productsNew = productHelper.priceNewProducts(products1);
    // End products new
    res.render("client/pages/home/index", {
        pageTitle : "Trang chủ",
        productFeatured : productFeatured,
        productsNew : productsNew,
    })
}
module.exports = {
   index
}