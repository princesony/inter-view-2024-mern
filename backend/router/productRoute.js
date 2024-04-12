// routes/authRoutes.js
const express = require('express');
const { addProduct, getProducts,deleteProductById,updateProductById} = require('../controller/productCtrl');
const adminAuth = require( '../middleware/adminAuth')  ;
const router = express.Router();

//create router  middleware that will verify the token in headers for
router.post('/addproduct',adminAuth,addProduct)
router.get('/getproducts',getProducts)
router.put('/updateproduct/:id',updateProductById)
router.delete('/deleteproduct/:id',deleteProductById)



module.exports = router;
