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
    res.render("client/pages/home/index", {
        pageTitle : "Trang chủ",
        productFeatured : productFeatured,
    })
}
module.exports = {
   index
}