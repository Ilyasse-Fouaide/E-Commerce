const { StatusCodes } = require("http-status-codes");
const Product = require("../models/product.model");
const tryCatchWrapper = require("../tryCatchWrapper");

module.exports.index = tryCatchWrapper(async (req, res, next) => {
  const {
    name,
    price,
    description,
    image,
    category,
    company,
    colors,
    featured,
    freeShipping,
    averageRating
  } = req.body;

  const product = new Product();

  product.name = name
  product.price = price
  product.description = description
  product.image = image
  product.category = category
  product.company = company
  product.colors = colors
  product.featured = featured
  product.freeShipping = freeShipping
  product.averageRating = averageRating
  product.user = req.user.userId

  await product.save();

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

module.exports.upload = tryCatchWrapper(async (req, res, next) => {
  res.status(StatusCodes.OK).json({ success: true })
});
