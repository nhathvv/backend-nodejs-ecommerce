const ProductCategory = require("../../models/products-category.model")
const systemConfig = require('../../config/system')
const filerStatusHelper = require("../../helpers/filterStatus")
const searchHelper = require("../../helpers/search")
const paginationHelper = require("../../helpers/pagination")
const createTreeHelper = require("../../helpers/createTree")
// [GET] /admin/products-category
const index = async(req,res) => {
    // Filter
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
    // Sort
    let sort = {}
    if(req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue
    }else {
        sort.position = "asc"
    }
    // Pagination
    const countProduct = await ProductCategory.countDocuments(find);
    const objectPagination = paginationHelper({
        currentPage  : 1,
        limitItems : 4
    }, req.query, countProduct)
    const records = await ProductCategory.find(find)
        .sort(sort)
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skip)
    // Tree
    const newRecords = createTreeHelper.tree(records);
    res.render("admin/pages/products-category/index",{
        pageTitle : "Danh mục sản phẩm",
        records : newRecords,
        filterStatus:filterStatus,
        keyword : objectSearch.keyword,
        pagination : objectPagination
    })
}
// [PATCH] /admin/products-category/change-status/:status/:id
const changeStatus = async(req,res) => {
    const status = req.params.status;
    const id = req.params.id;
    await ProductCategory.updateOne({_id : id}, {status:status})
    req.flash('success', 'Cập nhật trạng thái thành công!');
    res.redirect('back')
}
// [PATCH] /admin/products-category/change-multi
const changeMulti = async(req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(",");
    switch (type) {
        case "inactive":
            await ProductCategory.updateMany({_id :  {$in : ids}}, {status:"inactive"})
            req.flash('success',`Cập nhật trạng thái cho ${ids.length} sản phẩm thành công`);
            break;
        case "active":
            await ProductCategory.updateMany({_id :  {$in : ids}}, {status:"active"})
            req.flash('success',`Cập nhật trạng thái cho ${ids.length} sản phẩm thành công`);
            break;
        case "delete-all":
            await ProductCategory.updateMany({_id :  {$in : ids}}, {deleted : true, deletedAt:new Date()})
            req.flash('success',`Đã xóa ${ids.length} sản phẩm thành công`);
            break;
        case "change-position":
            for (const item of ids) {
                let [id,position] = item.split("-");
                position = parseInt(position);
                await ProductCategory.updateOne({_id : id}, {position:position})
            }
            req.flash('success',`Cập nhật ví trí cho ${ids.length} thành công`);
            break;
        default:
            break;
    }
    res.redirect('back')
}
// [GET] /admin/products-category/create
const create = async(req,res) => {
    let find = {
        deleted : false
    }
    const records = await ProductCategory.find(find);
    const newRecords = createTreeHelper.tree(records);
    res.render("admin/pages/products-category/create",{
        pageTitle : "Tạo danh mục",
        records : newRecords
    })
}
// [POST] /admin/products-category/create
const createCategoryProduct = async(req,res) => {
    if(req.body.position == "") {
        const countProduct = await ProductCategory.countDocuments({})
        req.body.position = countProduct + 1;
    }else {
        req.body.position = parseInt(req.body.position);
    }
    const productCategory = new ProductCategory(req.body);
    await productCategory.save();

    res.redirect(`${systemConfig.prefixAdmin}/products-category`)
}
// [GET] /admin/products-category/edit/:id
const edit = async(req,res) => {
    try {
        const id = req.params.id;
        let find = {
            deleted: false,
            _id : id
        }
        const data = await ProductCategory.findOne(find)
        const records = await ProductCategory.find({deleted : false})
        const newRecords = createTreeHelper.tree(records)
        res.render("admin/pages/products-category/edit",{
            pageTitle : data.title,
            data : data,
            records : newRecords
        })
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products-category`)
    }
}
// [PATCH] /admin/products-category/edit/:id
const editCategory = async(req,res) => {
    const id = req.params.id
    req.body.position = parseInt(req.body.position);
    try {
        await ProductCategory.updateOne({_id: id}, req.body)
        req.flash("success", "Cập nhật sản phẩm thành công!")
    } catch (error) {
        console.log(error)
        req.flash("error", "Cập nhật sản phẩm thất bại!")
    }
    res.redirect(`${systemConfig.prefixAdmin}/products-category`)
}
//[GET] /admin/products-category/detail/:id
const detail = async(req,res) => {
    const id = req.params.id
    let find = {
        _id : id,
        deleted : false
    }
    const data = await ProductCategory.findOne(find)
    const records = await ProductCategory.find({deleted : false})
    const newRecords = createTreeHelper.tree(records)

    res.render("admin/pages/products-category/detail",{
        pageTitle : data.title,
        data : data,
        records: newRecords
    })
}
const deleteItem = async(req,res) => {
    const id = req.params.id;
    try {
        await ProductCategory.updateOne({_id:id}, {deleted : true, deletedAt: new Date()})
        req.flash("success","Xóa danh mục thành công")
        res.redirect("back")
    } catch (error) {
        req.flash("error","Xóa danh mục không thành công")
        res.redirect("back")
    }
}
module.exports = {
    index,
    create,
    changeStatus,
    changeMulti,
    createCategoryProduct,
    edit,
    editCategory,
    detail,
    deleteItem,
}