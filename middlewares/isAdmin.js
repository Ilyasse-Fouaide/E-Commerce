const { ReasonPhrases } = require("http-status-codes");
const { unauthorizedError } = require('../customError');

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(unauthorizedError(`${ReasonPhrases.UNAUTHORIZED}, only admin can access to this route.`));
  }
  next()
}

module.exports = isAdmin
