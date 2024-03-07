const ProductCategory = require("../../models/products-category.model")
const createTreeHelper = require("../../helpers/createTree")
const category = async(req,res,next) =>  {
    let find = {
        deleted : false
    }
    const category = await ProductCategory.find(find)
    const layoutProductsCategory = createTreeHelper.tree(category);
    res.locals.layoutProductsCategory = layoutProductsCategory;
    next()
}
module.exports = {
    category
}