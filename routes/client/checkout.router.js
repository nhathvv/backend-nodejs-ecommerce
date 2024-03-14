const express = require('express')
const router = express.Router()
const checkoutController = require("../../controllers/client/checkout.controller")

router.get("/",checkoutController.index);
router.post("/order",checkoutController.order);
router.get("/success/:orderId",checkoutController.success);
module.exports = router;