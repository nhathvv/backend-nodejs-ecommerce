const index = (req, res) => {
    res.render("client/pages/products/index",{
        pageTitle : "Danh sách sản phẩm"
    })
}
module.exports = {
    index
}