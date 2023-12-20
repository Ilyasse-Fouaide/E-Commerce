const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const tryCatchWrapper = require("../tryCatchWrapper");
const Review = require("../models/review.model");
const Product = require("../models/product.model");
const { notFoundError, badRequestError, forbiddenError } = require("../customError");
const { canIDeleteReview, canIUpdateReview } = require("../utils");

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
  const { rating, title, review: rev, product } = req.body;
  const { reviewId } = req.params;

  const review = await Review.findById(reviewId);

  if (!review) {
    return next(notFoundError("no review found."))
  }

  const iHaveAccess = canIUpdateReview(req, review.user);

  if (!iHaveAccess) {
    return next(forbiddenError(`403-${ReasonPhrases.FORBIDDEN}`))
  }


  review.rating = rating;
  review.title = title;
  review.review = rev;
  review.product = product;

  await review.save();

  res.status(StatusCodes.OK).json({ success: true })
});

module.exports.destroy = tryCatchWrapper(async (req, res, next) => {
  const { reviewId } = req.params;

  const review = await Review.findById(reviewId);

  if (!review) {
    return next(notFoundError("no review found."))
  }

  const iHaveAccess = canIDeleteReview(req, review.user);

  if (!iHaveAccess) {
    return next(forbiddenError(`403-${ReasonPhrases.FORBIDDEN}`))
  }

  await Review.findByIdAndDelete(reviewId);

  res.status(StatusCodes.OK).json({ success: true })
});
