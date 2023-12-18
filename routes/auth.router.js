const router = require("express").Router();
const auth = require("../controllers/auth.controller")
const authorized = require("../middlewares/authorized");

router.route("/register").post(auth.register)
router.route("/login").post(auth.login)
router.route("/logout").post(auth.logout)
router.route("/profile").get(authorized, auth.profile)

module.exports = router
