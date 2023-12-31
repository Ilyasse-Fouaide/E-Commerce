const { StatusCodes, ReasonPhrases } = require("http-status-codes")

const errorHandler = (err, req, res, next) => {

  let HttpStatusCode = err.HttpStatusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  let error = {
    success: false,
    error: {
      status: HttpStatusCode,
      message: err.message || ReasonPhrases.INTERNAL_SERVER_ERROR
    }
  }

  if (err.name && err.name === "ValidationError") {
    HttpStatusCode = StatusCodes.BAD_REQUEST;
    error.error.status = HttpStatusCode;
    error.error.message = Object.values(err.errors).map(({ path, message }) => {
      return { [path]: message }
    });
  }

  if (err.code && err.code === 11000) {
    HttpStatusCode = StatusCodes.BAD_REQUEST;
    error.error.status = HttpStatusCode;
    error.error.message = `The email has already been taken.`;
  }

  if (err.name && err.name === "CastError" && err.kind === "ObjectId") {
    HttpStatusCode = StatusCodes.BAD_REQUEST;
    error.error.status = HttpStatusCode;
    error.error.message = `Please enter a valid _id`;
  }

  res.status(HttpStatusCode).json(error)
}

module.exports = errorHandler
