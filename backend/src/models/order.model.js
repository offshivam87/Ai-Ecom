const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                },
                name: String,
                price: Number,
                quantity: Number,
               
            },
        ],

        Address: {
            name: String,
            phone: String,
            address: String,
            city: String,
            pincode: String,
        },

        totalQuantity: Number,
        totalAmount: Number,

        status: {
            type: String,
            enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"],
            default: "Pending",
        },
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;