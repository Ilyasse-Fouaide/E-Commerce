const router = require("express").Router();
const user = require("../controllers/user.controller")
const authorized = require("../middlewares/authorized");

router.route("/")
  .get(authorized, user.index)
  .post(authorized, user.store);

router.route("/:id")
  .get(authorized, user.show)
  .patch(authorized, user.update)
  .delete(authorized, user.destroy);

module.exports = router
