const express = require('express')
const router = express.Router()
const multer  = require('multer')
const controllers = require("../../controllers/admin/settings.controller")
const upload = multer()
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")
router.get('/general', controllers.general);
router.patch('/general',
          upload.single("logo"),
          uploadCloud.upload,
          controllers.generalPatch);
module.exports = router;