// [GET]: /admin/dashboard
const dashboard = (req, res) => {
    res.render("admin/pages/dashboard/index", {
        pageTitle : "Trang tổng quan"
    })
}
module.exports = {
    dashboard
}