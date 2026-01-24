const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
        },

        category: {
            type: String,
            required: true,
            enum: [
                "Electronics",
                "Fashion",
                "Home"
            ],
        },

        subCategory: {
            type: String,
            required: true,
        },

        brand: {
            type: String,
            default: "Generic",
        },

        image:{
            type: String, // image URL
            required: true,
        },


        stock: {
            type: Number,
            required: true,
            default: 1,
        },

        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },

        isFeatured: {
            type: Boolean,
            default: false,
        },

        isNewArrival: {
            type: Boolean,
            default: false,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // admin
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);
