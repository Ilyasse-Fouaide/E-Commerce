const router = require("express").Router();
const auth = require("../controllers/auth.controller")

router.route("/register").post(auth.register)
router.route("/login").post(auth.login)
router.route("/logout").post(auth.logout)

module.exports = router
