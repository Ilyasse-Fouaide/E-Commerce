const { StatusCodes } = require("http-status-codes");

class CustomError extends Error {
  constructor(message, HttpStatusCode) {
    super(message);
    this.HttpStatusCode = HttpStatusCode
  }
}

const badRequestError = (message) => {
  return new CustomError(message, StatusCodes.BAD_REQUEST)
}

const unauthorizedError = (message) => {
  return new CustomError(message, StatusCodes.UNAUTHORIZED)
}

const notFoundError = (message) => {
  return new CustomError(message, StatusCodes.NOT_FOUND)
}

module.exports = {
  CustomError,
  badRequestError,
  unauthorizedError,
  notFoundError
}
