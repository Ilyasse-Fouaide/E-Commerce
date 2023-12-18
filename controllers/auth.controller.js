const { StatusCodes } = require("http-status-codes");
const isEmail = require('validator/lib/isEmail');
const { badRequestError, notFoundError } = require('../customError');
const tryCatchWrapper = require("../tryCatchWrapper");
const User = require("../models/user.model");
const { setCookie } = require("../utils");

module.exports.register = tryCatchWrapper(async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!isEmail(email)) {
    return next(badRequestError("Please fill valid email."))
  }

  const count = await User.countDocuments({});
  const role = count === 0 ? 'admin' : 'user'

  const user = await User.create({ username, email, password, role });

  setCookie(res, user.genToken());

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

  setCookie(res, user.genToken());

  res.status(StatusCodes.OK).json({ success: true })
});

module.exports.logout = (req, res) => {
  //clear cookie
  res
    .status(200)
    .cookie('refresh_token', '', {
      httpOnly: true,
      expires: new Date(0)
    })
    .json({ success: true });
}
