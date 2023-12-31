const router = require("express").Router();
const user = require("../controllers/user.controller")
const authorized = require("../middlewares/authorized");
const authorizedPermissions = require("../middlewares/authorizedPermissions");

router.route("/")
  .get(authorized, authorizedPermissions("admin"), user.index)
  .post(authorized, user.store);

router.route("/update-password").patch(authorized, user.updatePassword);

router.route("/:userId")
  .get(authorized, user.show)
  .patch(authorized, user.update)
  .delete(authorized, user.destroy);

module.exports = router
