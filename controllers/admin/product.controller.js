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
// [PATCH] /admin/products/change-multi
const changeMulti = async(req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(",");
    switch (type) {
        case "inactive":
            await Product.updateMany({_id :  {$in : ids}}, {status:"inactive"})
            break;
        case "active":
            await Product.updateMany({_id :  {$in : ids}}, {status:"active"})
            break;
        case "delete-all":
            await Product.updateMany({_id :  {$in : ids}}, {deleted : true, deletedAt:new Date()})
            break;
        default:
            break;
    }
    res.redirect('back')
}
// [DELETE] /admin/products/delete/:id
const deleteItem = async(req,res) => {
    const id = req.params.id;
    // Permanently deleted
    // await Product.deleteOne({_id : id})
    // Soft erase
    await Product.updateOne({_id: id}, {deleted : true, deletedAt : new Date()})
    res.redirect('back')
}
module.exports = {
    index,
    changeStatus,
    changeMulti,
    deleteItem
}