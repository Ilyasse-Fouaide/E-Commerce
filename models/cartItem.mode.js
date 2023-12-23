const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  cart: {
    type: mongoose.Types.ObjectId,
    ref: "carts"
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: "products"
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const CartItem = mongoose.model("cart_items", cartItemSchema);

module.exports = CartItem
