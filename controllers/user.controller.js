const { StatusCodes } = require("http-status-codes");
const tryCatchWrapper = require("../tryCatchWrapper");
const User = require("../models/user.model");
const { notFoundError } = require("../customError");

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

module.exports.destroy = tryCatchWrapper(async (req, res, next) => {
  res.status(StatusCodes.OK).json({ success: true })
});
