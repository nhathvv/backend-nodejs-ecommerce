const register = (req, res,next) => {
    if(req.body.fullName == "") {
        req.flash("error","Vui lòng nhập họ và tên");
    }
    if(req.body.email == "") {
        req.flash("error","Vui lòng nhập email");
    }
    if(req.body.password == "") {
        req.flash("error","Vui lòng nhập mật khẩu");
    }
    next()
}
const login = (req, res,next) => {
    if(req.body.email == "") {
        req.flash("error","Vui lòng nhập email");
    }
    if(req.body.password == "") {
        req.flash("error","Vui lòng nhập mật khẩu");
    }
    next()
}
const forgotPassword = (req, res,next) => {
    if(req.body.email == "") {
        req.flash("error","Vui lòng nhập email");
    }
    next()
}
const resetPassword = (req, res,next) => {
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    if(!password) {
        req.flash("error","Mật khẩu không được để trống");
        res.redirect("back");
        return;
    }
    if(!confirmPassword) {
        req.flash("error","Nhập lại mật khẩu không được để trống");
        res.redirect("back");
        return;
    }
    if(password != confirmPassword) {
        req.flash("error","Mật khẩu không trùng khớp");
        res.redirect("back");
        return;
    }
    next()
}
module.exports = {
    register,
    login,
    forgotPassword,
    resetPassword,
}