const Account = require("../../models/account.model")
const systemConfig = require('../../config/system')
const md5 = require('md5');
// [GET] /admin/my-account
const index = async(req,res) => {
    res.render("admin/pages/my-account/index",{
        pageTitle : "Thông tin cá nhân",
    })
}
// [GET] /admin/my-account
const edit = async(req,res) => {
    res.render("admin/pages/my-account/edit",{
        pageTitle : "Chỉnh sửa thông tin cá nhân",
    })
}
const editMyAccount = async(req,res) => {
    const id = res.locals.user.id;
    const emailExits = await Account.findOne({
        _id : {$ne: id},
        email : req.body.email,
        deleted : false,
    })
    const phoneExits = await Account.findOne({
        _id : {$ne: id},
        phone: req.body.phone,
        deleted: false
    })
    if(emailExits) {
        req.flash("error","Email đã tồn tại! ")
        res.redirect("back")
    }else if(phoneExits) {
        req.flash("error","Số điện thoại đã tồn tại! ")
        res.redirect("back")
    }else {
        req.body.password = md5(req.body.password)
        await Account.updateOne({_id:id}, req.body);
        req.flash("success", "Cập nhật tải khoản thành công!")
        res.redirect(`${systemConfig.prefixAdmin}/my-account`)
    }
}
module.exports = {
    index,
    edit,
    editMyAccount
}