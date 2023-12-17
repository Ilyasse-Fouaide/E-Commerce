const { StatusCodes } = require("http-status-codes")

const errorHandler = (err, req, res, next) => {

  const HttpStatusCode = err.HttpStatusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const error = {
    success: false,
    message: {
      status: HttpStatusCode,
      err: err.message || err
    }
  }

  res.status(HttpStatusCode).json(error)
}

module.exports = errorHandler
