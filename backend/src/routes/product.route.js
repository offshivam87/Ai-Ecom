const express = require('express');
const productModel = require('../models/product.model');
const authMiddleware = require('../controller/auth.controller');
const isUserAdmin = require('../middleware/IsUserAdmin');
const { createProduct, updateProduct } = require('../controller/productController');
const { deleteProduct } = require('../controller/productController');
const upload = require('../middleware/upload.middleware');
const { getAllProducts } = require('../controller/getAllproduct.controller');
const { getAdminStats } = require('../controller/dashboardStats.controller');
const adminOrders = require('../controller/adminOrders.controller');

const router = express.Router();

router.post('/createProduct',isUserAdmin,upload.single("image"),createProduct);
router.delete('/deleteProduct/:id', isUserAdmin, deleteProduct);
router.put('/updateProduct/:id', isUserAdmin,upload.single("image"), updateProduct);
router.get('/getAllProducts', getAllProducts)
router.get('/order-stats', isUserAdmin,getAdminStats);
router.get('/adminOrders',isUserAdmin,adminOrders)
module.exports = router; 