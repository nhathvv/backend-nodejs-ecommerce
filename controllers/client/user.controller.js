const User = require("../../models/user.model");
const Cart = require("../../models/cart.model");
const ForgotPassword = require("../../models/forgot-password.model");
const sendMailHelper = require("../../helpers/sendMail");
const md5 = require("md5");
const generateHelper = require("../../helpers/generate");
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
    await Cart.updateOne({
        _id : req.cookies.cartId
    },{
        user_id : user._id
    })
    req.flash("success","Đăng nhập thành công");
    res.cookie("tokenUser",user.tokenUser);
    res.redirect("/");
}
// [GET] /user/logout
const logout = (req, res) => {
    res.clearCookie("tokenUser");
    res.clearCookie("cartId");
    res.redirect("/");
}
// [GET] /user/password/forgot
const forgotPassword = async (req, res) => {
    res.render("client/pages/user/forgot-password", { pageTitle: "Quên mật khẩu" })
}
// [POST] /user/password/forgot
const postForgotPassword = async (req, res) => {
    const email = req.body.email;
    const user = await User.findOne({email : email,deleted : false,status : "active"});
    if(!user) {
        req.flash("error","Email không tồn tại");
        res.redirect("back");
        return;
    }
    // Send email
    const objectForgotPassword = {
        email : email,
        otp : generateHelper.generateRandomNumber(6),
        expireAt : Date.now() 
    }
    const forgotPassword = new ForgotPassword(objectForgotPassword);
    forgotPassword.save();
    // Send email
    sendMailHelper.sendMail(email,"Mã OTP đổi mật khẩu",`Mã OTP của bạn là : <b>${objectForgotPassword.otp}</b>`)
    res.redirect(`/user/password/forgot/otp?email=${email}`);
}
// [GET] /user/password/forgot/otp
const otp = async (req, res) => {
    const email = req.query.email;
    res.render("client/pages/user/otp-password", { pageTitle: "Nhập mã OTP",email : email })
}
// [POST] /user/password/otp
const postOtp = async (req, res) => {
    const email = req.body.email;
    const otp = req.body.otp;
    const forgotPassword = await ForgotPassword.findOne({email : email,otp : otp});
    if(!forgotPassword) {
        req.flash("error","Mã OTP không chính xác");
        res.redirect("back");
        return;
    }
    const user = await User.findOne({
        email : email,
        deleted : false,
        status : "active"
    });
    res.cookie("tokenUser",user.tokenUser);
    res.redirect(`/user/password/forgot/reset?email=${email}`);
}
// [GET] /user/password/forgot/reset
const resetPassword = async (req, res) => {
    const email = req.query.email;
    res.render("client/pages/user/reset-password", { pageTitle: "Nhập mật khẩu mới",email : email })
}
// [POST] /user/password/forgot/reset
const postResetPassword = async (req, res) => {;
    const password = md5(req.body.password);
    const tokenUser = req.cookies.tokenUser;
    await User.updateOne({tokenUser : tokenUser},{password : password});
    req.flash("success","Đổi mật khẩu thành công");
    res.redirect("/");
}
// [GET] /user/info
const info = async (req, res) => {
    const tokenUser = req.cookies.tokenUser;
    const infoUser = await User.findOne({tokenUser : tokenUser}).select("-password");
    res.render("client/pages/user/info", { pageTitle: "Thông tin tài khoản", infoUser : infoUser })
}
module.exports = {
    register,
    postRegister,
    login,
    postLogin,
    logout,
    forgotPassword,
    postForgotPassword,
    otp,
    postOtp,
    resetPassword,
    postResetPassword,
    info,
}