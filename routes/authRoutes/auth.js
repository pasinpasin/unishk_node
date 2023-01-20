const express = require("express");
const router = express.Router();
const authController = require("../../controllers/users/authController");

router.route("/").get(authController.isLoggedIn);

module.exports = router;
