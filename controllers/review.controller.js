const { StatusCodes } = require("http-status-codes");
const tryCatchWrapper = require("../tryCatchWrapper");
const Review = require("../models/review.model");
const Product = require("../models/product.model");
const { notFoundError } = require("../customError");

module.exports.index = tryCatchWrapper(async (req, res, next) => {
  const { rating, title, review, productId } = req.body;
  const { userId } = req.user;

  const product = await Product.findById(productId);

  if (product) {
    return next(notFoundError("no product found."))
  }

  await Review.create({
    rating,
    title,
    review,
    user: userId,
    productId
  });

  res.status(StatusCodes.OK).json({ success: true })
});

module.exports.store = tryCatchWrapper(async (req, res, next) => {



  res.status(StatusCodes.CREATED).json({ success: true })
});

module.exports.show = tryCatchWrapper(async (req, res, next) => {
  res.status(StatusCodes.OK).json({ success: true })
});

module.exports.update = tryCatchWrapper(async (req, res, next) => {
  res.status(StatusCodes.OK).json({ success: true })
});

module.exports.destroy = tryCatchWrapper(async (req, res, next) => {
  res.status(StatusCodes.OK).json({ success: true })
});
