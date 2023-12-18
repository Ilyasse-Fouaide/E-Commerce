const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const isEmail = require('validator/lib/isEmail');
const jwt = require("jsonwebtoken");
const { badRequestError, notFoundError, unauthorizedError } = require('../customError');
const tryCatchWrapper = require("../tryCatchWrapper");
const User = require("../models/user.model");
const { setCookie } = require("../utils");
const config = require("../config");

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
    .status(StatusCodes.OK)
    .cookie('refresh_token', '', {
      httpOnly: true,
      expires: new Date(Date.now())  // expires now
    })
    .json({ success: true });
}

module.exports.profile = tryCatchWrapper(async (req, res, next) => {
  const { refresh_token } = req.cookies;

  if (!refresh_token) {
    next(unauthorizedError(ReasonPhrases.UNAUTHORIZED))
  }

  jwt.verify(refresh_token, config.JWT_SECRET, (err, decoded) => {
    if (err) {
      next(unauthorizedError(ReasonPhrases.UNAUTHORIZED))
    }
    res.status(StatusCodes.OK).json({
      success: true,
      decoded
    })
  })

});
