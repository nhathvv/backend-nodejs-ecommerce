const Product = require("../../models/product.model")
const productHelper = require("../../helpers/product")
const index = async (req, res) => {
    const keyword = req.query.keyword;
    if (keyword) {
        const regex = new RegExp(keyword, 'i');
        const products = await Product.find({
            title: regex,
            status : "active",
            deleted : false
        })
        const newProducts = productHelper.priceNewProducts(products)
        res.render("client/pages/search/index",{
            pageTitle : "Danh sách sản phẩm",
            keyword : keyword,
            products : newProducts,
        })
    }else {
        res.redirect("/")
    }
}
module.exports = {
    index
}
