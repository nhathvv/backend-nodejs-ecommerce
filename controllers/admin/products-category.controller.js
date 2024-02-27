const ProductCategory = require("../../models/products-category.model")
const systemConfig = require('../../config/system')
const filerStatusHelper = require("../../helpers/filterStatus")
const searchHelper = require("../../helpers/search")
// [GET] /admin/products-catelogy
const index = async(req,res) => {
    const filterStatus = filerStatusHelper(req.query)
    const objectSearch = searchHelper(req.query);
    let find = {
        deleted : false
    }
    if(req.query.status) {
        find.status = req.query.status
    }
    const records = await ProductCategory.find(find)

    res.render("admin/pages/products-categogy/index",{
        pageTitle : "Danh mục sản phẩm",
        records : records,
        filterStatus:filterStatus,
        keyword : objectSearch.keyword
    })
}
// [GET] /admin/products-category/create
const create = async(req,res) => {
    res.render("admin/pages/products-categogy/create",{
        pageTitle : "Tạo danh mục",
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
module.exports = {
    index,
    create,
    createCategoryProduct
}