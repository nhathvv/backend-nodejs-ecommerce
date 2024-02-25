const Product = require("../../models/product.model")

// [GET]: /products
const index = async (req, res) => {
    const products = await Product.find({
        status : "active",
        deleted : false
    }).sort({position:"desc"})
    const newProducts = products.map(item => {
        item.priceNew = item.price - (item.price * item.discountPercentage / 100).toFixed(0)
        return item;
    })
    res.render("client/pages/products/index",{
        pageTitle : "Danh sách sản phẩm",
        products : newProducts
    })
}
// [GET]: /products/:slug
const detail = async(req,res) => {
    try {
        const slug = req.params.slug;
        let find = {
            deleted : false,
            slug : slug,
            status: "active"
        }
        const product = await Product.findOne(find);
        res.render("client/pages/products/detail",{
            pageTitle : product.title,
            product : product
        })
       } catch (error) {
        res.redirect(`/products`)
       }
}
module.exports = {
    index,
    detail
}