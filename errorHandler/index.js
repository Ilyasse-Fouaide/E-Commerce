const { StatusCodes, ReasonPhrases } = require("http-status-codes")

const errorHandler = (err, req, res, next) => {

  let HttpStatusCode = err.HttpStatusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  let error = {
    success: false,
    message: {
      status: HttpStatusCode,
      error: err.message || ReasonPhrases.INTERNAL_SERVER_ERROR
    }
  }

  if (err.name && err.name === "ValidationError") {
    HttpStatusCode = StatusCodes.BAD_REQUEST;
    error.message.status = StatusCodes.BAD_REQUEST;
    error.message.error = Object.values(err.errors).map(({ path, message }) => {
      return { [path]: message }
    });
  }

  res.status(HttpStatusCode).json(error)
}

module.exports = errorHandler
