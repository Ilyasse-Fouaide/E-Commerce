const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
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
    category: {
      type: String,
      required: true,
      enum: {
        values: ['office', 'kitchen', 'bedroom'],
        message: '{VALUE} is not supported'
      }
    },
    company: {
      type: String,
      required: true,
      enum: {
        values: ['ikea', 'liddy', 'marcos'],
        message: '{VALUE} is not supported'
      }
    },
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
    averageRating: {
      type: Number,
      required: false,
      default: 0
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// just for populate product reviews because we don't have any reference product to reviews
productSchema.virtual('reviews', {
  ref: "reviews",
  localField: "_id",
  foreignField: "product"
});

const Product = mongoose.model("products", productSchema);

module.exports = Product
