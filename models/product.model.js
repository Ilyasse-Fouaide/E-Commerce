const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true
  },
  category: String,
  company: String,
  colors: [{
    type: String,
  }],
  featured: {
    type: Boolean,
    required: false,
    default: false
  },
  freeShipping: {
    type: Boolean,
    required: false,
    default: false
  },
  inventory: Number,
  averageRating: Number,
  user: {
    type: mongoose.Types.ObjectId,
    ref: "users"
  }
});

const Product = mongoose.model("users", productSchema);

module.exports = Product
