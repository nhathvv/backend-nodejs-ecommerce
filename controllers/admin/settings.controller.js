const SettingsGeneral = require("../../models/settings-general.model");
//[GET] /admin/settings/general
const general =  async(req,res) => {
    const settingGeneral = await SettingsGeneral.findOne({});
    res.render("admin/pages/settings/general", {
        pageTitle: "Cài đặt chung",
        settingGeneral: settingGeneral,
    })
}
// [POST] /admin/settings/general
const generalPatch = async(req,res) => {
    const settingGeneral = await SettingsGeneral.findOne({});
    console.log(">> check setting general", settingGeneral)
    if(settingGeneral) {
        await SettingsGeneral.updateOne({},req.body);
    }else {
        const settingsGeneral = new SettingsGeneral(req.body);
        await settingsGeneral.save();
    }
    req.flash('success', 'Cập nhật cài đặt chung thành công!');
    res.redirect("back")
}
module.exports = {
    general,
    generalPatch,
}