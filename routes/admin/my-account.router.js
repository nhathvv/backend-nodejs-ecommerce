const express = require('express')
const controllers = require("../../controllers/admin/my-account.controller")
const router = express.Router()
const multer  = require('multer')
const upload = multer()
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")

router.get('/', controllers.index);
router.get("/edit",controllers.edit)
router.patch("/edit",
            upload.single('avatar'),
            uploadCloud.upload,controllers.editMyAccount)
module.exports = router;