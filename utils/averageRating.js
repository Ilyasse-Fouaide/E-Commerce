const mongoose = require("mongoose");
const Product = require("../models/product.model");
const Review = require("../models/review.model");
const { ObjectId } = mongoose.Types;

const averageRating = async (productId) => {
  const reviews = await Review.aggregate([
    { $match: { product: new ObjectId(productId) } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$rating" },
        numOfReviews: { $sum: 1 }
      }
    }
  ]);

  return reviews[0] || { averageRating: 0, numOfReviews: 0 };
}

const updateRatingProduct = async (productId) => {
  const avg = await averageRating(productId);

  const product = await Product.findById(productId);
  product.averageRating = Number(avg.averageRating).toFixed(2);  // Rounding numbers to 2 digits after comma
  product.numOfReviews = avg.numOfReviews;

  await product.save();
}

module.exports = updateRatingProduct;
