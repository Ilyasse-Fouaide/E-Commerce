const { ReasonPhrases } = require("http-status-codes");
const { forbiddenError } = require('../customError');

const authorizedPermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(forbiddenError(`403 - ${ReasonPhrases.FORBIDDEN}`));
    }
    next()
  }
}

module.exports = authorizedPermissions
