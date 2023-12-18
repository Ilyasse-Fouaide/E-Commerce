const mongoose = require("mongoose");
// import isEmail from 'validator/lib/isEmail';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    // validate: {
    //   validator: isEmail,
    //   message: 'Please fill a valid email address'
    // },
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: "user"
  }
}, { timestamps: true });

const User = mongoose.model("users", userSchema);

module.exports = User
