const { StatusCodes } = require("http-status-codes");
const isEmail = require('validator/lib/isEmail');
const { badRequestError } = require('../customError');
const tryCatchWrapper = require("../tryCatchWrapper");
const User = require("../models/user.model");

module.exports.register = tryCatchWrapper(async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!isEmail(email)) {
    return next(badRequestError("Please fill valid email."))
  }

  const user = await User.create({ username, email, password });

  res.status(StatusCodes.OK).json({ message: "register" })
});

module.exports.login = tryCatchWrapper(async (req, res, next) => {
  res.status(StatusCodes.OK).json({ message: "login" })
});
