const User = require("../../models/user.model");
const md5 = require("md5");
//[GET] /user/register
const register = (req, res) => {
    res.render("client/pages/user/register", { pageTitle: "Đăng ký tài khoản" })
}
// [POST] /user/register
const postRegister = async (req, res) => {
   console.log(req.body);
   const exitEmail = await User.findOne({email : req.body.email});
   if(exitEmail) {
       req.flash("error","Email đã tồn tại");
       res.redirect("back");
       return;
   }
    req.body.password = md5(req.body.password);
    const user = new User(req.body);
    user.save();
    req.flash("success","Đăng ký tài khoản thành công");
    res.cookie("tokenUser",user.tokenUser);
    res.redirect("/");
}
// [GET] /user/login
const login = (req, res) => {
    res.render("client/pages/user/login", { pageTitle: "Đăng nhập" })
}
// [POST] /user/login
const postLogin = async (req, res) => {
    const user = await User.findOne({
        email : req.body.email,
        password : md5(req.body.password)
    });
    if(!user) {
        req.flash("error","Email hoặc mật khẩu không chính xác");
        res.redirect("back");
        return;
    }
    req.flash("success","Đăng nhập thành công");
    res.cookie("tokenUser",user.tokenUser);
    res.redirect("/");
}
// [GET] /user/logout
const logout = (req, res) => {
    res.clearCookie("tokenUser");
    res.redirect("/");
}
module.exports = {
    register,
    postRegister,
    login,
    postLogin,
    logout,
}