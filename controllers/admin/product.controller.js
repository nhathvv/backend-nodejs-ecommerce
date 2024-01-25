const Product = require("../../models/product.model")
const filerStatusHelper = require("../../helpers/filterStatus")
const searchHelper = require("../../helpers/search")
const paginationHelper = require("../../helpers/pagination")

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
    // Pagination
    const countProduct = await Product.countDocuments(find);
    const objectPagination = paginationHelper({
        currentPage  : 1,
        limitItems : 4
    }, req.query, countProduct)
    const products = await Product.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip)
    res.render("admin/pages/products/index",{
        pageTitle : "Danh sách sản phẩm",
        products : products,
        filterStatus : filterStatus,
        keyword : objectSearch.keyword,
        pagination : objectPagination
    })
}
// [PATCH] /admin/products/change-status/:status/:id
const changeStatus = async(req,res) => {
    const status = req.params.status;
    const id = req.params.id;
    await Product.updateOne({_id : id}, {status:status})
    res.redirect('back')
}
const changeMulti = async(req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(",");
    await Product.updateMany({_id :  {$in : ids}}, {status:type})
    res.redirect('back')
}
module.exports = {
    index,
    changeStatus,
    changeMulti
}