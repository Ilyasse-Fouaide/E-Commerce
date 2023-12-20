const { StatusCodes } = require("http-status-codes");
const tryCatchWrapper = require("../tryCatchWrapper");
const Review = require("../models/review.model");
const Product = require("../models/product.model");
const { notFoundError, badRequestError } = require("../customError");

module.exports.index = tryCatchWrapper(async (req, res, next) => {
  const limit = req.query.limit || 5

  const reviews = await Review
    .find()
    .sort("-createdAt")
    .limit(limit)
    .select("-__v")
    .populate([
      { path: "user", select: "_id username" }
    ]);

  res.status(StatusCodes.OK).json({
    success: true,
    count: reviews.length,
    limit,
    reviews
  })
});

module.exports.store = tryCatchWrapper(async (req, res, next) => {
  const { rating, title, review, product: productId } = req.body;
  const { userId } = req.user;

  const product = await Product.findById(productId);

  if (!product) {
    return next(notFoundError("no product found."))
  }

  const reviewAlreadyExist = await Review.findOne({ user: userId, product: productId });

  if (reviewAlreadyExist) {
    return next(badRequestError("You have already submitted for this product."));
  }

  await Review.create({
    rating,
    title,
    review,
    user: userId,
    product: productId
  });

  res.status(StatusCodes.CREATED).json({ success: true })
});

module.exports.show = tryCatchWrapper(async (req, res, next) => {
  const { reviewId } = req.params;

  const review = await Review
    .findById(reviewId)
    .populate([
      { path: "user", select: "_id username" },
      { path: "product", select: "" }
    ]);

  if (!review) {
    return next(notFoundError("no review found."))
  }

  res.status(StatusCodes.OK).json({ success: true, review })
});

module.exports.update = tryCatchWrapper(async (req, res, next) => {
  res.status(StatusCodes.OK).json({ success: true })
});

module.exports.destroy = tryCatchWrapper(async (req, res, next) => {
  res.status(StatusCodes.OK).json({ success: true })
});
