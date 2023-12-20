const { StatusCodes } = require("http-status-codes");
const Product = require("../models/product.model");
const tryCatchWrapper = require("../tryCatchWrapper");

module.exports.index = tryCatchWrapper(async (req, res, next) => {
  res.status(StatusCodes.OK).json({ success: true })
});

module.exports.store = tryCatchWrapper(async (req, res, next) => {
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

  const product = await Product.create({
    name,
    price,
    description,
    image,
    category,
    company,
    colors,
    featured,
    freeShipping,
    averageRating,
    user: req.user.userId
  });

  res.status(StatusCodes.CREATED).json({ success: true, product })
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
