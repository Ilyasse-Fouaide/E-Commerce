const { CustomError } = require("../customError")

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    res.status(err.HttpStatusCode).json({
      success: false,
      error: {
        status: err.HttpStatusCode,
        message: err.message
      }
    })
  }
}

module.exports = errorHandler
