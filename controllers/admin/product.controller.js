const Product = require("../../models/product.model")
const systemConfig = require('../../config/system')
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
    const products = await Product.find(find)
        .sort({position:"desc"})
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skip)
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
    req.flash('success', 'Cập nhật trạng thái thành công!');
    res.redirect('back')
}
// [PATCH] /admin/products/change-multi
const changeMulti = async(req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(",");
    switch (type) {
        case "inactive":
            await Product.updateMany({_id :  {$in : ids}}, {status:"inactive"})
            req.flash('success',`Cập nhật trạng thái cho ${ids.length} sản phẩm thành công`);
            break;
        case "active":
            await Product.updateMany({_id :  {$in : ids}}, {status:"active"})
            req.flash('success',`Cập nhật trạng thái cho ${ids.length} sản phẩm thành công`);
            break;
        case "delete-all":
            await Product.updateMany({_id :  {$in : ids}}, {deleted : true, deletedAt:new Date()})
            req.flash('success',`Đã xóa ${ids.length} sản phẩm thành công`);
            break;
        case "change-position":
            for (const item of ids) {
                let [id,position] = item.split("-");
                position = parseInt(position);
                await Product.updateOne({_id : id}, {position:position})
            }
            req.flash('success',`Cập nhật ví trí cho ${ids.length} thành công`);
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
// [GET] /admin/products/create
const create = async(req,res) =>{
    res.render("admin/pages/products/create",{
        pageTitle : "Thêm mới sản phẩm",
    })
}
// [POST] /admin/products/create
const createProduct = async(req,res) => {
    console.log(req.file)
    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)
    console.log(req.body);
    if(req.body.position == "") {
        const countProduct = await Product.countDocuments({})
        req.body.position = countProduct + 1;
    }else {
        req.body.position = parseInt(req.body.position);
    }
    req.body.thumbnail = `/uploads/${req.file.filename}`
    
    const product = new Product(req.body);
    await product.save();

    res.redirect(`${systemConfig.prefixAdmin}/products`)
}
module.exports = {
    index,
    changeStatus,
    changeMulti,
    deleteItem,
    create,
    createProduct
}