const express = require('express');
const  {createOrder, updateOrders}  = require('../controller/order.controller');
const { getMyOrders } = require('../controller/order.controller');
const authMiddleware= require("../middleware/auth.middleware")

const router = express.Router();

router.post('/createOrder', createOrder);
router.get('/my-orders',authMiddleware, getMyOrders);
router.post('/updateorder/:id',updateOrders)
module.exports = router;