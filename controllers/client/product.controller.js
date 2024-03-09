const Product = require("../../models/product.model")
const ProductCategory = require("../../models/products-category.model")
const productHelper = require("../../helpers/product")

// [GET]: /products
const index = async (req, res) => {
    const products = await Product.find({
        status : "active",
        deleted : false
    }).sort({position:"desc"})
    const productsNew = productHelper.priceNewProducts(products)
    res.render("client/pages/products/index",{
        pageTitle : "Danh sách sản phẩm",
        productsNew : productsNew
    })
}
// // [GET]: /products/:slug
// const detail = async(req,res) => {
//     try {
//         const slug = req.params.slug;
//         let find = {
//             deleted : false,
//             slug : slug,
//             status: "active"
//         }
//         const product = await Product.findOne(find);
//         res.render("client/pages/products/detail",{
//             pageTitle : product.title,
//             product : product
//         })
//        } catch (error) {
//         res.redirect(`/products`)
//        }
// }
// [GET] /products/:slugCategory
const category = async(req,res) => {
   
}
module.exports = {
    index,
    category,
}