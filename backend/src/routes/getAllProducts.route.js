const express = require('express');
const productModel = require('../models/product.model');

const router = express.Router();

router.get('/getAllProducts', async (req, res) => {
    const keyword = req.query.keyword || "";
    try {
        const products = await productModel.find({name:{$regex: keyword, $options: "i"}});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;