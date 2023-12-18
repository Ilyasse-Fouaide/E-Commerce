const router = require("express").Router();
const user = require("../controllers/user.controller")
const authorized = require("../middlewares/authorized");
const isAdmin = require("../middlewares/isAdmin");

router.route("/")
  .get(authorized, user.index)
  .post(authorized, user.store);

router.route("/:userId")
  .get(authorized, isAdmin, user.show)
  .patch(authorized, user.update)
  .delete(authorized, user.destroy);

module.exports = router
