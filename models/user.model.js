const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");

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

userSchema.methods.comparePassword = async function (givenPassword, password) {
  return await bcrypt.compare(givenPassword, password);
}

userSchema.methods.genToken = function () {
  const token = jwt.sign({ userId: this._id, username: this.username }, config.JWT_SECRET, { expiresIn: config.JWT_LIFETIME })
  return token
}

const User = mongoose.model("users", userSchema);

module.exports = User
