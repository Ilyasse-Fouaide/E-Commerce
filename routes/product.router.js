const router = require("express").Router();
const product = require("../controllers/product.controller")
const authorized = require("../middlewares/authorized");
const authorizedPermissions = require("../middlewares/authorizedPermissions");

router.route("/")
  .get(product.index)
  .post(authorized, product.store);

router.route("/:productId")
  .get(product.show)
  .patch(authorized, product.update)
  .delete(authorized, product.destroy);

module.exports = router
