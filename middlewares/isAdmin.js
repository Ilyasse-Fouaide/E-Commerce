const { ReasonPhrases } = require("http-status-codes");
const { forbiddenError } = require('../customError');

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(forbiddenError(`403 - ${ReasonPhrases.FORBIDDEN}`));
  }
  next()
}

module.exports = isAdmin
