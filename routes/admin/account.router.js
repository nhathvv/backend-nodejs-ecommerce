const express = require('express')
const controllers = require("../../controllers/admin/account.controller")
const validates = require("../../validates/admin/account.validate")
const router = express.Router()
const multer  = require('multer')
const upload = multer()
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")

router.get('/', controllers.index);
router.get("/create", controllers.create)
router.post("/create",
        upload.single('avatar'),
        uploadCloud.upload,
        validates.create,
        controllers.createAccount,)
router.get("/edit/:id", controllers.edit)
router.patch("/edit/:id",
        upload.single('avatar'),
        uploadCloud.upload,
        validates.edit,
        controllers.editAccount,)
router.get("/detail/:id", controllers.detail)
router.delete("/delete/:id",controllers.deleteAccount)
module.exports = router;