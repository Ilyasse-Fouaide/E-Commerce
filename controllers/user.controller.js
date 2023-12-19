const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const tryCatchWrapper = require("../tryCatchWrapper");
const User = require("../models/user.model");
const { notFoundError, badRequestError } = require("../customError");

module.exports.index = tryCatchWrapper(async (req, res, next) => {
  const users = await User.
    find({ role: "user" })
    .sort("-createdAt")
    .select("-__v -password")

  res.status(StatusCodes.OK).json({
    success: true,
    users
  })
});

module.exports.store = tryCatchWrapper(async (req, res, next) => {
  res.status(StatusCodes.OK).json({ success: true })
});

module.exports.show = tryCatchWrapper(async (req, res, next) => {
  const { userId } = req.params;

  const user = await User
    .findById(userId)
    .select("-__v -password");

  if (!user) {
    return next(notFoundError("user not found."))
  }

  res.status(StatusCodes.OK).json({ success: true, user })
});

module.exports.update = tryCatchWrapper(async (req, res, next) => {
  res.status(StatusCodes.OK).json({ success: true })
});

module.exports.updatePassword = tryCatchWrapper(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const { userId } = req.user

  if (!oldPassword || !newPassword) {
    return next(badRequestError("Please fill your empty fields."))
  }

  const user = await User.findById(userId);

  const isMatch = await user.comparePassword(oldPassword, user.password);

  if (!isMatch) {
    next(badRequestError("Your old password is wrong."))
  }

  user.password = newPassword;
  await user.save();

  res.status(StatusCodes.OK).json({ success: true })
});

module.exports.destroy = tryCatchWrapper(async (req, res, next) => {
  res.status(StatusCodes.OK).json({ success: true })
});
