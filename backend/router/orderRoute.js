const express = require('express');
const router = express.Router();
const {orderController,orederbyStripe} = require('../controller/orderCrtl');
const auth  = require("../middleware/auth");
// POST route for handling payment success and saving orders
router.post('/payment-success',auth, orderController.saveOrderProducts);
router.post('orderbygatewaypayment',auth,orederbyStripe)
module.exports = router;
