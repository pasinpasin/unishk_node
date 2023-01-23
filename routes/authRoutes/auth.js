const express = require("express");
const router = express.Router();
const authController = require("../../controllers/users/authController");
const checkMiddleware = require("../../middleware/checkAuth");

//router.route("/").get(authController.isLoggedIn);
router.route("/").get(checkMiddleware.isAuthenticated, authController.getUser);
//router.route("/").get(authController.getUser);
router.route("/logout").get(authController.logout);

module.exports = router;
