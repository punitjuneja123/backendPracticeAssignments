const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  stock: Number,
});

const productModel = mongoose.model("product", productSchema);

module.exports = { productModel };
