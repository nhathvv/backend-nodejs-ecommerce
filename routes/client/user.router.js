const express = require('express')
const router = express.Router()
const userController = require("../../controllers/client/user.controller")
const userValidate = require("../../validates//client/user.validate")
router.get('/register',userController.register)
router.post('/register',userValidate.register,userController.postRegister)
router.get('/login',userController.login)
router.post('/login',userValidate.login,userController.postLogin)
router.get('/logout',userController.logout)
router.get("/password/forgot",userController.forgotPassword)
router.post("/password/forgot",userValidate.forgotPassword,userController.postForgotPassword)
router.get("/password/forgot/otp",userController.otp)
router.post("/password/otp",userController.postOtp)
router.get("/password/forgot/reset",userController.resetPassword);
router.post("/password/reset",userValidate.resetPassword,userController.postResetPassword);
module.exports = router;