const Review = require("../models/review.model");
const mongoose = require("mongoose");
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

  return reviews[0];
}

module.exports = averageRating;
