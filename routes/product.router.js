const router = require("express").Router();
const product = require("../controllers/product.controller")
const authorized = require("../middlewares/authorized");
const authorizedPermissions = require("../middlewares/authorizedPermissions");

router.route("/")
  .get(product.index)
  // .post(authorized, authorizedPermissions("admin"), product.store)
  .post(product.store);

router.route("/uploadImage")
  .post(authorized, authorizedPermissions("admin"), product.upload)

router.route("/:productId")
  .get(product.show)
  .patch(authorized, authorizedPermissions("admin"), product.update)
  .delete(authorized, authorizedPermissions("admin"), product.destroy);

router.route("/:productId/reviews")
  .get(product.productReviews)

module.exports = router
