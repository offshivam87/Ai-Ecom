const express = require('express');
const productModel = require('../models/product.model');
const authMiddleware = require('../middleware/auth.middleware');
const isUserAdmin = require('../middleware/IsUserAdmin');
const { createProduct, updateProduct } = require('../controller/productController');
const { deleteProduct } = require('../controller/productController');

const router = express.Router();

router.post('/createProduct',isUserAdmin,createProduct);
router.delete('/deleteProduct/:id', isUserAdmin, deleteProduct);
router.patch('/updateProduct/:id', isUserAdmin, updateProduct);

module.exports = router;