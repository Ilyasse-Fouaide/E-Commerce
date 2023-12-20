const router = require("express").Router();
const review = require("../controllers/review.controller")
const authorized = require("../middlewares/authorized");

router.route("/")
  .get(review.index)
  .post(authorized, review.store);

router.route("/:reviewId")
  .get(review.show)
  .patch(authorized, review.update)
  .delete(authorized, review.destroy);

module.exports = router
