const { ReasonPhrases } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { unauthorizedError } = require('../customError');
const config = require("../config");

const authorized = (req, res, next) => {
  const { refresh_token } = req.cookies;

  if (!refresh_token) {
    return next(unauthorizedError(ReasonPhrases.UNAUTHORIZED))
  }

  jwt.verify(refresh_token, config.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(unauthorizedError(ReasonPhrases.UNAUTHORIZED))
    }

    const user = {
      userId: decoded.userId,
      username: decoded.username,
      role: decoded.role
    }

    req.user = user;
    next()
  })
}

module.exports = authorized
