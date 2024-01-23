const Product = require("../../models/product.model")

// [GET]: /admin/products
const index = async (req, res) => {
    const status = req.query.status
    let filterStatus = [
        {
            name : "Tất cả",
            status : "",
            class : "",
        },
        {
            name : "Hoạt động",
            status : "active",
            class :"",
        },
        {
            name : "Dừng hoạt động",
            status : "inactive",
            class :"",
        }
    ]
    if(req.query.status) {
        const index = filterStatus.findIndex(item => item.status == req.query.status);
        filterStatus[index].class = "active";
    }else {
        const index = filterStatus.findIndex(item => item.status == "");
        filterStatus[index].class = "active";
    }

    let find = {
        deleted : false
    }
    if(status) {
        find.status = req.query.status
    }
    // Search
    let keyword = ""
    if(req.query.keyword) {
        keyword = req.query.keyword
        const regax = new RegExp(keyword,"i");
        find.title = regax
    }
    const products = await Product.find(find)
    res.render("admin/pages/products/index",{
        pageTitle : "Danh sách sản phẩm",
        products : products,
        filterStatus : filterStatus,
        keyword : keyword
    })
}
module.exports = {
    index

}