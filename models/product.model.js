const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: [100, "Name cannot be more than 100 characters"]
  },
  price: {
    type: Number,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: [1000, "Description cannot be more than 1000 characters"]
  },
  image: {
    type: String,
    required: false,
    default: "/upload/images/default.jpg"
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
}, { timestamps: true });

const Product = mongoose.model("users", productSchema);

module.exports = Product
