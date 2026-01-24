require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("../models/product.model");





const products = 
  // 🔹 ELECTRONICS
  [
  {
    "name": "Wooden Study Table",
    "description": "Strong and durable wooden study table ideal for home and office use.",
    "price": 5499,
    "category": "Home",
    "subCategory": "Furniture",
    "brand": "HomeTown",
    "image": "https://ik.imagekit.io/vzualvibemedia/products/81N4-jejzxL._SX522_.jpg",
    "stock": 8,
    "rating": 4.4,
    "isFeatured": true,
    "isNewArrival": false
  },
  {
    "name": "Non-Stick Cookware Set",
    "description": "5-piece non-stick cookware set suitable for daily cooking.",
    "price": 2999,
    "category": "Home",
    "subCategory": "Kitchen",
    "brand": "Prestige",
    "image": "https://ik.imagekit.io/vzualvibemedia/products/71e7OBKX2mL._SX522_.jpg",
    "stock": 20,
    "rating": 4.3,
    "isFeatured": true,
    "isNewArrival": true
  },
  {
    "name": "LED Table Lamp",
    "description": "Energy efficient LED table lamp with adjustable brightness.",
    "price": 1299,
    "category": "Home",
    "subCategory": "Lighting",
    "brand": "Philips",
    "image": "https://ik.imagekit.io/vzualvibemedia/products/71Us6oJzUaL._SX679_.jpg",
    "stock": 25,
    "rating": 4.5,
    "isFeatured": false,
    "isNewArrival": true
  },
  {
    "name": "Memory Foam Pillow",
    "description": "Soft memory foam pillow for comfortable sleep and neck support.",
    "price": 999,
    "category": "Home",
    "subCategory": "Bedding",
    "brand": "SleepyCat",
    "image":"https://ik.imagekit.io/vzualvibemedia/products/71VqBFkXpiL._SX522_.jpg",
    "stock": 30,
    "rating": 4.2,
    "isFeatured": false,
    "isNewArrival": false
  },
  {
    "name": "Electric Kettle 1.5L",
    "description": "Fast boiling electric kettle with auto shut-off feature.",
    "price": 1799,
    "category": "Home",
    "subCategory": "Appliances",
    "brand": "Havells",
    "image": "https://ik.imagekit.io/vzualvibemedia/products/51R6DHkqoYL._SX522_.jpg",
    "stock": 15,
    "rating": 4.6,
    "isFeatured": true,
    "isNewArrival": true
  }
]


async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.insertMany(products);

    console.log("✅ Products seeded successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedProducts();
