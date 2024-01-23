const Product = require("../../models/product.model")
const filerStatusHelper = require("../../helpers/filterStatus")
const searchHelper = require("../../helpers/search")

// [GET]: /admin/products
const index = async (req, res) => {
    const filterStatus = filerStatusHelper(req.query)
    let find = {
        deleted : false
    }
    if(req.query.status) {
        find.status = req.query.status
    }

    // Search
    const objectSearch = searchHelper(req.query);
    if(req.query.keyword) {
        find.title = objectSearch.regex
    }

    const products = await Product.find(find)
    res.render("admin/pages/products/index",{
        pageTitle : "Danh sách sản phẩm",
        products : products,
        filterStatus : filterStatus,
        keyword : objectSearch.keyword
    })
}
module.exports = {
    index

}