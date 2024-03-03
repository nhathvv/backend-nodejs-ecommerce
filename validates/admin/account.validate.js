const create = (req,res,next) => {
    if(!req.body.fullName) {
        req.flash("error","Vui lòng nhập họ và tên");
    }
    if(!req.body.email) {
        req.flash("error","Vui lòng nhập email");
    }
    if(!req.body.password) {
        req.flash("error","Vui lòng nhập mật khẩu");
    }
    next()
}
const edit = (req,res,next) => {
    if(!req.body.fullName) {
        req.flash("error","Vui lòng nhập họ và tên");
    }
    if(!req.body.email) {
        req.flash("error","Vui lòng nhập email");
    }
    next()
}
module.exports = {
    create,
    edit
}