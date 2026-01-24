const productModel = require("../models/product.model");

const getAllProducts = async (req, res) => {
  try {
    const { category, featured, newArrival, _id } = req.query;

    let query = {};

    if (category) query.category = category;
    if (featured === "true") query.isFeatured = true;
    if (newArrival === "true") query.isNewArrival = true;
    if (_id) query._id = _id;

    const products = await productModel.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};
module.exports = {
  getAllProducts,
};