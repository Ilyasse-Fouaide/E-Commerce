const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "users"
  }
}, { timestamps: true });

const Cart = mongoose.model("carts", cartSchema);

module.exports = Cart
