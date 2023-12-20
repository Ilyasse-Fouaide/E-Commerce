const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    trim: true,
  },
  review: {
    type: String,
    required: true,
    time: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required: true
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: "products",
    required: true
  }
}, { timestamps: true });

const Review = mongoose.model("reviews", reviewSchema);

module.exports = Review
