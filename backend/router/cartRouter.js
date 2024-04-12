// routes/authRoutes.js
const express = require('express');
const { addCartItem,getCartItems,incrementQuantity,decrementQuantity,deleteCartItem} = require('../controller/cartCtrl');
const auth  = require("../middleware/auth");
const router = express.Router();

//create router  middleware that will verify the token in headers for
router.post('/addcart/:product_id', auth,addCartItem);
router.get('/getcart', auth , getCartItems)
router.patch('/cart/incqnty/:id', auth, incrementQuantity);
router.patch('/cart/decqnty/:id', auth, decrementQuantity);
router.delete('/cart/:id', auth, deleteCartItem);




module.exports = router;
