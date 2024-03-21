const mongoose = require("mongoose");
const settingsGeneralSchema = new mongoose.Schema({
  websiteName : {
    type : String,
    required : true,
  },
  logo : String,
  phone : String,
  email : String,
  address : String,
  copyright : String,
},{timestamps : true});
const SettingsGeneral = mongoose.model('SettingsGeneral', settingsGeneralSchema,"settings-general");
module.exports = SettingsGeneral;