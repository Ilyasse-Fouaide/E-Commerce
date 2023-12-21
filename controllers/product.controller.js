const { StatusCodes } = require("http-status-codes");
const Product = require("../models/product.model");
const tryCatchWrapper = require("../tryCatchWrapper");
const { notFoundError, badRequestError } = require("../customError");
const path = require("path");

module.exports.index = tryCatchWrapper(async (req, res, next) => {
  const products = await Product
    .find()
    .sort("-createdAt")
    .limit(25)
    .populate(
      { path: "user", select: "_id username" }
    );

  res.status(StatusCodes.OK).json({
    success: true,
    count: products.length,
    products
  })
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

  await Product.create({
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

  res.status(StatusCodes.CREATED).json({ success: true })
});

module.exports.show = tryCatchWrapper(async (req, res, next) => {
  const { productId } = req.params;

  const product = await Product.findById(productId);

  if (!product) {
    return next(notFoundError("no product found."))
  }

  res.status(StatusCodes.OK).json({ success: true, product })
});

module.exports.update = tryCatchWrapper(async (req, res, next) => {
  const { productId } = req.params;
  const {
    name,
    price,
    description,
    image,
    category,
    company,
    colors,
    featured,
    freeShipping
  } = req.body;

  const product = await Product.findById(productId);

  if (!product) {
    return next(notFoundError("no product found."))
  }

  product.name = name;
  product.price = price;
  product.description = description;
  product.image = image;
  product.category = category;
  product.company = company;
  product.colors = colors;
  product.featured = featured;
  product.freeShipping = freeShipping;

  await product.save()

  res.status(StatusCodes.OK).json({ success: true })
});

module.exports.destroy = tryCatchWrapper(async (req, res, next) => {
  const { productId } = req.params;

  const product = await Product.findByIdAndDelete(productId);

  if (!product) {
    return next(notFoundError("no product found."))
  }

  res.status(StatusCodes.OK).json({ success: true })
});

module.exports.upload = tryCatchWrapper(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(badRequestError("No files were uploaded."))
  }

  const image = req.files.image;
  const imageName = Date.now() + "." + image.mimetype.split("/")[1]

  const uploadPath = path.join(
    __dirname, "../", "public", "/upload", "/images",
    imageName
  );

  const maxSize = 1024 * 500;

  if (image.size > maxSize) {  // 500kb
    return next(badRequestError("Image size exceeds the limit of 500kb"))
  }

  if (image.mimetype.split("/")[0] !== "image") {
    return next(badRequestError(`${image.mimetype.split("/")[1]} not supported.`))
  }

  image.mv(uploadPath, function (err) {
    if (err) {
      return next(err);
    }
    res.status(StatusCodes.OK).json({
      success: true,
      image: `public/upload/images/${imageName}`
    })
  })
});
