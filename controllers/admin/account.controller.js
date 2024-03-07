const Account = require("../../models/account.model")
const Role = require("../../models/role.model")
const systemConfig = require('../../config/system')
const md5 = require('md5');
//[GET] /admin/accounts/
const index = async(req,res) => {
    let find = {
        deleted : false,
    }
    const records = await Account.find(find).select("-password -token")
    for (const record of records) {
        const role = await Role.findOne({
            _id: record.role_id,
            deleted:false,
        })
        record.role = role
    }
    res.render("admin/pages/accounts/index",{
        pageTitle : "Quản lý tài khoản",
        records: records
    })
}
// [GET] /admin/create
const create = async(req,res) => {
    let find = {
        deleted : false,
    }
    const roles = await Role.find(find);
    res.render("admin/pages/accounts/create", {
        pageTitle: "Thêm mới tài khoản",
        roles : roles,
    })
}
// [POST] /admin/create
const createAccount = async(req,res) => {
    const emailExits = await Account.findOne({
        email : req.body.email,
        deleted : false,
    })
    const phoneExits = await Account.findOne({
        phone: req.body.phone,
        deleted: false
    })
    if(emailExits) {
        req.flash("error","Email đã tồn tại! ")
        res.redirect("back")
    }else if(phoneExits) {
        req.flash("error","Số điện thoại đã tồn tại! ")
        res.redirect("back")
    }
    else {
        if(req.body.password) {
            req.body.password = md5(req.body.password)
            const account = new Account(req.body)
            await account.save()
            req.flash('success', 'Thêm mới tài khoản thành công!');
            res.redirect(`${systemConfig.prefixAdmin}/accounts`)
        }else {
            delete req.body.password
        }
    }
}
// [GET] /admin/accounts/edit/:id
const edit = async(req,res) => {
    const id = req.params.id;
    try {
        let find = {
            _id: id,
            deleted: false,
        }
        const roles = await Role.find({deleted:false})
        const data = await Account.findOne(find)
        res.render("admin/pages/accounts/edit", {
            pageTitle: "Cập nhật tài khoản",
            data : data,
            roles:roles,
        })
    } catch (error) {
        req.flash("error", "Không tìm thấy tài khoản")
        res.redirect(`${systemConfig.prefixAdmin}/accounts`)
    }
}
// [PATCH] / admin/accounts/edit/:id
const editAccount = async(req,res) => {
    const id = req.params.id;
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
        res.redirect(`${systemConfig.prefixAdmin}/accounts`)
    }
}
// [GET] /admin/accounts/detail/:d
const detail = async(req,res) => {
    const id = req.params.id
    try {
        let find = {
            _id : id,
            deleted: false,
        }
        const data = await Account.findOne(find).select("-password -token");
        const role = await Role.findOne({
            _id: data.role_id,
            deleted:false,
        })
        data.role = role
        res.render("admin/pages/accounts/detail", {
            pageTitle: "Chi tiết tài khoản",
            data:data,
        })
    } catch (error) {
        req.flash("error","Không tìm thấy tài khoản")
        res.redirect("back")
    }
}
//[DELETE] /admin/accounts/delete 
const deleteAccount = async(req,res) => {
    const id = req.params.id;
    try {
        await Account.updateOne({_id:id},{deleted : true, deletedAt : new Date()})
        req.flash("success", "Xóa tài khoản thành công")
    } catch (error) {
        req.flash("error", "Xóa tài khoản thất bại")
    }
    res.redirect("back")
}
module.exports = {
    index,
    create,
    createAccount,
    edit,
    editAccount,
    detail,
    deleteAccount,
}