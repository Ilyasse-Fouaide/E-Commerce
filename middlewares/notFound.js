const { notFoundError } = require("../customError")

const notFound = (req, res, next) => {
  next(notFoundError(`${req.method}: ${req.url} doesn't match!.`));
}

module.exports = notFound
