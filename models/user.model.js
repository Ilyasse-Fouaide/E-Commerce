const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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

userSchema.pre('save', function () {
  const salt = bcrypt.genSaltSync(8);
  const hashPass = bcrypt.hashSync(this.password, salt);
  this.password = hashPass;
});

const User = mongoose.model("users", userSchema);

module.exports = User
