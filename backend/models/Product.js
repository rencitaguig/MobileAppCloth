const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  category: String,
  subcategory: String,
  images: [String],
  sizes: [String],
  bestseller: Boolean
});

module.exports = mongoose.model("Product", ProductSchema);
