const express = require('express')
const controllers = require("../../controllers/admin/product.controller")
const validates = require("../../validates/admin/product.validate")
const router = express.Router()
const multer  = require('multer')
const upload = multer()
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")
router.get('/', controllers.index);
router.patch('/change-status/:status/:id', controllers.changeStatus);
router.patch('/change-multi', controllers.changeMulti);
router.delete('/delete/:id', controllers.deleteItem);
router.get("/create", controllers.create)
router.post("/create",
        upload.single('thumbnail'),
        uploadCloud.upload,
        validates.createPost,
        controllers.createProduct);
router.get("/edit/:id", controllers.edit)
router.patch("/edit/:id",
        upload.single('thumbnail'),
        uploadCloud.upload,
        validates.createPost,
        controllers.editProduct);
router.get("/detail/:id",controllers.detail)
module.exports = router;
