const mongoose = require("mongoose");
const orderModel = require("../models/order.model");

async function createOrder(req, res) {
  const { name, phone, userId, items, totalAmount, address, totalQuantity, city, pincode } = req.body;
  try {



    const newOrder = await orderModel.create({
      user: userId,
      items,
      totalAmount,
      totalQuantity,
      Address: {   // ✔ exact match
        name,
        phone,
        address,
        city,
        pincode,
      },
    });

    return res.status(201).json({
      message: "Order created successfully",
      order: newOrder
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to create order",
      error: error.message
    });
  }
}
const getMyOrders = async (req, res) => {
  try {
    const userId = req.userId;

    // JWT se

    const orders = await orderModel.find({ user: userId })
      .sort({ createdAt: -1 });
    console.log(orders);



    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};

const updateOrders = async (req, res) => {
  try {
    const id = req.params.id
    const data = req.body
    const updatedStatus = await orderModel.findByIdAndUpdate(id, {
      status: data.status
    }, { new: true })

    console.log(updatedStatus);
    res.json({
      message: "updated",
      updatedStatus
    })

  } catch (error) {
    console.log(error);

  }
}

module.exports = { getMyOrders, createOrder, updateOrders };