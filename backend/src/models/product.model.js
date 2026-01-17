const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true, default: 1 },
    images: [{ public_id: String, url: String }], // Array for multiple images
    user: { type: mongoose.Schema.ObjectId, ref: "User", required: true }, // किसने ऐड किया (Admin ID)
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Product", productSchema);