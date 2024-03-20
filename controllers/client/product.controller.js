const Product = require("../../models/product.model")
const ProductCategory = require("../../models/products-category.model")
const productHelper = require("../../helpers/product")
const productCategoryHelper = require("../../helpers/product-category")
// [GET]: /products
const index = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false
    }).sort({ position: "desc" })
    const productsNew = productHelper.priceNewProducts(products)
    res.render("client/pages/products/index", {
        pageTitle: "Danh sách sản phẩm",
        productsNew: productsNew
    })
}
// [GET]: /products/detail:slugProduct
const detail = async (req, res) => {
    try {
        const slug = req.params.slugProduct;
        let find = {
            deleted: false,
            slug: slug,
            status: "active"
        }
        const product = await Product.findOne(find);
        const category = await ProductCategory.findOne({
            _id: product.product_category_id,
            deleted: false,
            status: "active",
        })
        product.category = category
        productHelper.priceNewProduct(product)
        res.render("client/pages/products/detail", {
            pageTitle: product.title,
            product: product
        })
    } catch (error) {
        res.redirect(`/products`)
    }
}
// [GET] /products/:slugCategory
const category = async (req, res) => {
    const slug = req.params.slugCategory;
    try {
        const category = await ProductCategory.findOne({
            slug: slug,
            deleted: false,
            status: "active",
        })
        const listSubCategory = await productCategoryHelper.getSubCategory(category.id)
        const listSubCategoryID = listSubCategory.map(item => item.id);
        const products = await Product.find({
            product_category_id: { $in: [category.id, ...listSubCategoryID] },
            deleted: false,
            status: "active"
        })
        const productsNew = productHelper.priceNewProducts(products);
        res.render("client/pages/products/index", {
            pageTitle: category.title,
            productsNew: productsNew
        })
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    index,
    detail,
    category,
}