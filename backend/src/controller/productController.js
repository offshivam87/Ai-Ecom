const express = require('express');
const productModel = require('../models/product.model');
const jwt = require('jsonwebtoken');
const { uploadFile } = require('../service/imagekit.service');

async function createProduct(req, res) {

    try {
        console.log("route hitted");
       
        req.body.user = req.user._id;
        // multer se aayi file
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Product image is required",
            });
        }

        const fileData = await uploadFile(req.file);
        req.body.image = fileData.url;

        console.log(fileData);

        const newProduct = await productModel.create(req.body);
        res.status(201).json({ success: true, message: "Product created successfully", product: newProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
}

async function deleteProduct(req, res) {
    try {
        const product = await productModel.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
}

const updateProduct = async (req, res) => {
  try {
    let updateData = { ...req.body };

    // ✅ Sirf tab image update karo jab nayi image aayi ho
    if (req.file) {
      const fileData = await uploadFile(req.file);
      updateData.image = fileData.url;
    }

    const product = await productModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


module.exports = { createProduct, deleteProduct, updateProduct };