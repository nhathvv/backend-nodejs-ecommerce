const express = require('express')
const router = express.Router()
const productController = require("../../controllers/client/search.controller")
router.get('/',productController.index)
module.exports = router;