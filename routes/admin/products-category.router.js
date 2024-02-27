const express = require('express')
const router = express.Router()
const controllers = require("../../controllers/admin/products-category.controller")
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")
const validates = require("../../validates/admin/products-category.validate")
const multer  = require('multer')
const upload = multer()
router.get('/', controllers.index);
router.get("/create", controllers.create)
router.post("/create",
        upload.single('thumbnail'),
        uploadCloud.upload,
        validates.createCategoryPost,
        controllers.createCategoryProduct);
module.exports = router;