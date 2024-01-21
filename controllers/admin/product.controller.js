const Product = require("../../models/product.model")

// [GET]: /admin/products
const index = async (req, res) => {
    const products = await Product.find({
        deleted : false
    })
    res.render("admin/pages/products/index",{
        pageTitle : "Danh sách sản phẩm",
        products : products
    })
}
module.exports = {
    index
}