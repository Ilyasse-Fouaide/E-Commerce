const router = require("express").Router();
const product = require("../controllers/product.controller")
const authorized = require("../middlewares/authorized");
const authorizedPermissions = require("../middlewares/authorizedPermissions");

router.route("/")
  .get(product.index)
  .post(authorized, authorizedPermissions("admin"), product.store);

router.route("/:productId")
  .get(product.show)
  .patch(authorized, authorizedPermissions("admin"), product.update)
  .delete(authorized, authorizedPermissions("admin"), product.destroy);

module.exports = router
