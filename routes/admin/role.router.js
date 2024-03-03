const express = require('express')
const router = express.Router()
const controllers = require("../../controllers/admin/role.controller")

router.get('/', controllers.index);
router.get("/create", controllers.create)
router.post("/create", controllers.createRole)
router.get("/edit/:id",controllers.edit)
router.patch("/edit/:id", controllers.editRole)
router.get("/detail/:id", controllers.detail)
router.delete("/delete/:id",controllers.deleteRole)
router.get("/permissions", controllers.permissions)
router.patch("/permissions",controllers.permissionsPatch)
module.exports = router;