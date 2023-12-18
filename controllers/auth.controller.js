const { StatusCodes } = require("http-status-codes");
const isEmail = require('validator/lib/isEmail');
const { badRequestError, notFoundError } = require('../customError');
const tryCatchWrapper = require("../tryCatchWrapper");
const User = require("../models/user.model");
const config = require("../config");

module.exports.register = tryCatchWrapper(async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!isEmail(email)) {
    return next(badRequestError("Please fill valid email."))
  }

  const count = await User.countDocuments({});
  const role = count === 0 ? 'admin' : 'user'

  const user = await User.create({ username, email, password, role });

  res.cookie("refresh_token", user.genToken(), {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),  // 1 day same as JWT_LIFETIME
    secure: config.NODE_ENV === "production"
  })

  res.status(StatusCodes.OK).json({ success: true })
});

module.exports.login = tryCatchWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(badRequestError('`email` or `password` required'))
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(notFoundError("Invalid Credentials."))
  }

  const validPassword = await user.comparePassword(password, user.password);

  if (!validPassword) {
    return next(notFoundError("Invalid Credentials."))
  }

  res.cookie("refresh_token", user.genToken(), {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),  // 1 day same as JWT_LIFETIME
    secure: config.NODE_ENV === "production"
  })

  res.status(StatusCodes.OK).json({ success: true })
});
