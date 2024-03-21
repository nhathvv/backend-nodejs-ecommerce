const settingsGeneral = require("../../models/settings-general.model");
const settingGeneral = async (req, res, next) => {
  const settingGeneral = await settingsGeneral.findOne({});
  res.locals.settingGeneral = settingGeneral;
  next();
}
module.exports = {
  settingGeneral
}
