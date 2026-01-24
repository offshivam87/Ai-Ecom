const Order = require("../models/order.model");
const Product = require("../models/product.model");

const getAdminStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({
      status: "Pending",
    });
    const totalProducts = await Product.countDocuments();

    res.status(200).json({
      success: true,
      stats: {
        totalOrders,
        pendingOrders,
        totalProducts,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard stats",
    });
  }
};

module.exports = { getAdminStats };
