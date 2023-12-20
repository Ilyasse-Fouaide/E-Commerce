const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
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

reviewSchema.pre("save", async function (next) {
  await Review.findOne({ user: this.user }).count((err, count) => {
    if (count > 0) {
      return next("Error")
    }
    return
  })
})

module.exports = Review
