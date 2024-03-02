const Role = require("../../models/role.model")
const systemConfig = require('../../config/system')
// [GET] /admin/roles
const index = async(req,res) => {
    let find = {
        deleted : false,
    }
    const records = await Role.find(find)
    res.render("admin/pages/roles/index",{
       pageTitle : "Nhóm quyền",
       records : records
    })
}
// [GET] /admin/roles/create
const create = async(req,res) => {
    res.render("admin/pages/roles/create", {
        pageTitle : 'Tạo nhóm quyền'
    })
}
// [POST] /admin/roles/create
const createRole = async(req,res) => {
    try {
        const record = new Role(req.body)
        await record.save()
        req.flash("success", "Tạo mới Role thành công")
    } catch (error) {
        req.flash("error", "Tạo mới Role thất bại")
    }
    res.redirect(`${systemConfig.prefixAdmin}/roles`)
}
// [GET] /admin/roles/edit/:id
const edit = async(req,res) => {
  const id = req.params.id
  let find = {
    _id : id,
    deleted : false
  }
  try {
    const data = await Role.findOne(find)
    res.render("admin/pages/roles/edit", {
        pageTitle : "Chỉnh sửa nhóm quyền",
        data : data,
    })
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/roles`)
  }
}
// [PATCH] /admin/roles/edit/:id
const editRole = async(req,res) => {
    const id = req.params.id
    try {
        await Role.updateOne({_id:id},req.body)
        req.flash("success","Cập nhật nhóm quyền thành công")
    } catch (error) {
        req.flash("success","Cập nhật nhóm quyền thất bại")
    }
    res.redirect(`${systemConfig.prefixAdmin}/roles`)
}
// [GET] /admin/roles/detail/:id
const detail = async(req,res)=> {
    const id = req.params.id
    let find = {
        _id : id,
        deleted : false
    }
    try {
        const data = await Role.findOne(find)
        res.render("admin/pages/roles/detail", {
            pageTitle : "Chi tiết nhóm quyền",
            data : data
        })
    } catch (error) {
        req.flash("error","Không tìm thất nhóm quyền")
        res.redirect(`${systemConfig.prefixAdmin}/roles`)
    }
}
//[DELETE] /admin/roles/delete/:id
const deleteRole = async(req,res) => {
    const id = req.params.id
    try {
        await Role.updateOne({_id: id}, {deleted : true, deletedAt : new Date()})
        req.flash("success",'Xóa nhóm quyền thành công')
        res.redirect('back')
    } catch (error) {
        req.flash("error", "Xóa nhóm quyền thất bại")
        res.redirect(`${systemConfig.prefixAdmin}/roles`)
    }
}
module.exports = {
    index,
    create,
    createRole,
    edit,
    editRole,
    detail,
    deleteRole,
}