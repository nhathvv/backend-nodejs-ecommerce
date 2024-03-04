const Account = require("../../models/account.model")
const systemConfig = require('../../config/system')
const md5 = require('md5');
// [GET] /admin/auth/login
const login = async(req,res) => {
    res.render("admin/pages/auth/login", {
        pageTitle : "Đăng nhập",
    })
}
// [POST] /admin/auth/login
const loginAccount = async(req,res) => {
    const email = req.body.email
    const password = req.body.password
    const user = await Account.findOne({
        email : email,
        deleted : false
    })
    if(!user) {
        req.flash("error","Email không tồn tại!")
        res.redirect("back")
        return;
    }
    if(!(md5(password) == user.password)) {
        req.flash("error","Mật khẩu không chính xác")
        res.redirect("back")
        return;
    }
    if(user.status != "active") {
        req.flash("error","Tài khoản đã bị khóa")
        res.redirect("back")
        return;
    }
    res.cookie("token",user.token)
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
}
//[GET] /admin/auth/logout
const logout = async(req,res) => {
    res.clearCookie("token")
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
}
module.exports = {
    login,
    loginAccount,
    logout,
}