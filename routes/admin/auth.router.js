const express = require('express')
const controllers = require("../../controllers/admin/auth.controller")
const validates = require("../../validates/admin/auth.validate")
const router = express.Router()

router.get("/login",controllers.login)
router.post("/login",validates.login,controllers.loginAccount)
router.get("/logout",controllers.logout)

module.exports = router;